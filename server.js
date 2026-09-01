const http = require("http");
const fs = require("fs");
const https = require("https");
const path = require("path");

const root = __dirname;
const port = process.env.PORT || 3000;
const contactTo = process.env.CONTACT_TO || "";
const contactFrom = process.env.CONTACT_FROM || "";
const resendApiKey = process.env.RESEND_API_KEY || "";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY || "";
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 5;
const contactAttempts = new Map();
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml"
};

const readRequestBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const normalizeField = (value, maxLength = 900) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const stripExecutableHtml = (value) =>
  String(value || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/\bon\w+\s*=/gi, "");

const hasUnsafeHtml = (value) => /<[^>]*>|javascript:|\bon\w+\s*=/i.test(String(value || ""));

const sanitizeField = (value, maxLength) => normalizeField(stripExecutableHtml(value), maxLength);

const sanitizeMessage = (value, maxLength) =>
  String(stripExecutableHtml(value))
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim()
    .slice(0, maxLength);

const isValidEmail = (value) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);

const getClientIp = (request) => {
  const forwardedFor = request.headers["x-forwarded-for"];

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.socket.remoteAddress || "unknown";
};

const isRateLimited = (request) => {
  const clientIp = getClientIp(request);
  const now = Date.now();
  const record = contactAttempts.get(clientIp) || { count: 0, resetAt: now + rateLimitWindowMs };

  if (now > record.resetAt) {
    contactAttempts.set(clientIp, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  record.count += 1;
  contactAttempts.set(clientIp, record);
  return record.count > rateLimitMaxRequests;
};

const postJson = (url, headers, payload) =>
  new Promise((resolve, reject) => {
    const endpoint = new URL(url);
    const body = JSON.stringify(payload);
    const request = https.request(
      {
        hostname: endpoint.hostname,
        path: `${endpoint.pathname}${endpoint.search}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          ...headers
        }
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data);
            return;
          }

          reject(new Error(`Email provider responded with status ${res.statusCode}: ${data}`));
        });
      }
    );

    request.on("error", reject);
    request.write(body);
    request.end();
  });

const postForm = (url, payload) =>
  new Promise((resolve, reject) => {
    const endpoint = new URL(url);
    const body = new URLSearchParams(payload).toString();
    const request = https.request(
      {
        hostname: endpoint.hostname,
        path: `${endpoint.pathname}${endpoint.search}`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body)
        }
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data);
            return;
          }

          reject(new Error(`Turnstile responded with status ${res.statusCode}: ${data}`));
        });
      }
    );

    request.on("error", reject);
    request.write(body);
    request.end();
  });

const verifyTurnstileToken = async (payload, request) => {
  if (!turnstileSecretKey) {
    return { ok: false, statusCode: 503, message: "La verificación de seguridad aún no está configurada." };
  }

  const token = sanitizeField(payload.turnstile_token || payload["cf-turnstile-response"], 2048);

  if (!token) {
    return { ok: false, statusCode: 403, message: "No fue posible validar la verificación de seguridad." };
  }

  const rawResult = await postForm("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    secret: turnstileSecretKey,
    response: token,
    remoteip: getClientIp(request)
  });
  const result = JSON.parse(rawResult || "{}");

  if (!result.success) {
    return { ok: false, statusCode: 403, message: "No fue posible validar la verificación de seguridad." };
  }

  return { ok: true };
};

const validateContactPayload = (payload) => {
  const valuesToCheck = [
    payload.nombre,
    payload.empresa,
    payload.cargo,
    payload.correo,
    payload.telefono,
    payload.pais,
    payload.solucion,
    payload.asunto,
    payload.mensaje
  ];

  if (valuesToCheck.some(hasUnsafeHtml)) {
    return { error: "El formulario no acepta HTML, scripts ni contenido ejecutable." };
  }

  const fields = {
    nombre: sanitizeField(payload.nombre, 100),
    empresa: sanitizeField(payload.empresa, 100),
    cargo: sanitizeField(payload.cargo, 100),
    correo: sanitizeField(payload.correo, 150),
    telefono: sanitizeField(payload.telefono, 80),
    pais: sanitizeField(payload.pais, 120),
    solucion: sanitizeField(payload.solucion, 150),
    asunto: sanitizeField(payload.asunto || payload.solucion, 150),
    mensaje: sanitizeMessage(payload.mensaje, 3000)
  };
  const requiredFields = ["nombre", "correo", "asunto", "mensaje"];
  const missingField = requiredFields.find((field) => !fields[field]);

  if (missingField) {
    return { error: "Por favor complete los campos obligatorios del formulario." };
  }

  if (String(payload.nombre || "").trim().length > 100) {
    return { error: "El nombre no puede superar 100 caracteres." };
  }

  if (String(payload.correo || "").trim().length > 150 || !isValidEmail(fields.correo)) {
    return { error: "Ingrese un correo electrónico válido." };
  }

  if (String(payload.asunto || payload.solucion || "").trim().length > 150) {
    return { error: "El asunto no puede superar 150 caracteres." };
  }

  if (String(payload.mensaje || "").trim().length > 3000) {
    return { error: "El mensaje no puede superar 3000 caracteres." };
  }

  return { fields };
};

const buildContactEmail = (fields, request) => {
  const submittedAt = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "medium",
    timeStyle: "short"
  });
  const source = request.headers.referer || `http://${request.headers.host}/`;
  const rows = [
    ["Nombre", fields.nombre],
    ["Empresa", fields.empresa || "No informado"],
    ["Cargo", fields.cargo || "No informado"],
    ["Correo", fields.correo],
    ["Teléfono", fields.telefono || "No informado"],
    ["País", fields.pais || "No informado"],
    ["Asunto", fields.asunto],
    ["Fecha", submittedAt],
    ["Origen", source]
  ];
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;border-bottom:1px solid #d9e1e8;font-weight:700;color:#09223d;">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #d9e1e8;color:#5f6f7f;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return {
    subject: `Nueva solicitud web USCOM - ${fields.asunto}`,
    replyTo: fields.correo,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f3f7fb;padding:28px;">
        <div style="max-width:720px;margin:auto;background:#ffffff;border:1px solid #d9e1e8;border-radius:8px;overflow:hidden;">
          <div style="background:#09223d;color:#ffffff;padding:22px 26px;">
            <h1 style="margin:0;font-size:22px;">Nueva solicitud desde la web USCOM</h1>
          </div>
          <div style="padding:24px 26px;">
            <table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
            <h2 style="margin:26px 0 10px;color:#09223d;font-size:18px;">Mensaje</h2>
            <p style="white-space:pre-wrap;color:#5f6f7f;line-height:1.6;">${escapeHtml(fields.mensaje)}</p>
          </div>
        </div>
      </div>`,
    text: `Nueva solicitud desde la web USCOM\n\n${textRows}\n\nMensaje:\n${fields.mensaje}`
  };
};

const parsePayload = (body, request) => {
  const contentType = request.headers["content-type"] || "";

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(body));
  }

  return JSON.parse(body || "{}");
};

const sendContactEmail = (email) => {
  if (!resendApiKey || !contactTo || !contactFrom) {
    throw new Error("Email service is not configured");
  }

  return postJson(
    "https://api.resend.com/emails",
    { Authorization: `Bearer ${resendApiKey}` },
    {
      from: contactFrom,
      to: contactTo.split(",").map((emailAddress) => emailAddress.trim()).filter(Boolean),
      reply_to: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text
    }
  );
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/env.js" && request.method === "GET") {
    response.writeHead(200, {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(`window.USCOM_ENV=${JSON.stringify({ NEXT_PUBLIC_TURNSTILE_SITE_KEY: turnstileSiteKey })};`);
    return;
  }

  if (url.pathname === "/api/contact" && request.method === "POST") {
    readRequestBody(request)
      .then(async (body) => {
        const payload = parsePayload(body, request);

        if (sanitizeField(payload.website_company || payload.website, 200)) {
          sendJson(response, 200, { ok: true });
          return null;
        }

        if (isRateLimited(request)) {
          sendJson(response, 429, { ok: false, message: "Demasiadas solicitudes. Intente nuevamente más tarde." });
          return null;
        }

        const validation = validateContactPayload(payload);

        if (validation.error) {
          sendJson(response, 400, { ok: false, message: validation.error });
          return null;
        }

        const turnstile = await verifyTurnstileToken(payload, request);

        if (!turnstile.ok) {
          sendJson(response, turnstile.statusCode, { ok: false, message: turnstile.message });
          return null;
        }

        const email = buildContactEmail(validation.fields, request);
        return sendContactEmail(email);
      })
      .then((result) => {
        if (result === null) {
          return;
        }

        sendJson(response, 200, { ok: true, message: "Solicitud enviada correctamente." });
      })
      .catch((error) => {
        const isConfigError = error.message === "Email service is not configured";
        sendJson(response, isConfigError ? 503 : 500, {
          ok: false,
          message: isConfigError
            ? "El envío de correo aún no está configurado en el servidor."
            : "No fue posible enviar la solicitud. Intente nuevamente."
        });
      });
    return;
  }

  const cleanPath = url.pathname.replace(/\/+$/, "") || "/";
  const isCleanPageRoute =
    cleanPath === "/contacto" ||
    cleanPath === "/nosotros" ||
    cleanPath === "/casos-de-exito" ||
    cleanPath.startsWith("/casos-de-exito/") ||
    cleanPath.startsWith("/soluciones/");
  const requestedPath =
    cleanPath === "/"
      ? "/index.html"
      : cleanPath === "/terminos-y-condiciones"
        ? "/terms.html"
        : isCleanPageRoute
          ? "/page.html"
          : url.pathname;
  const filePath = path.normalize(path.join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream"
    });
    response.end(data);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`USCOM site running on port ${port}`);
});
