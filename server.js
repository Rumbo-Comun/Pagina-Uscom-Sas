const http = require("http");
const fs = require("fs");
const https = require("https");
const path = require("path");

const root = __dirname;
const port = process.env.PORT || 3000;
const contactTo = process.env.CONTACT_TO || "";
const contactFrom = process.env.CONTACT_FROM || "";
const resendApiKey = process.env.RESEND_API_KEY || "";
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

const buildContactEmail = (payload, request) => {
  const fields = {
    nombre: normalizeField(payload.nombre, 160),
    empresa: normalizeField(payload.empresa, 160),
    cargo: normalizeField(payload.cargo, 160),
    correo: normalizeField(payload.correo, 180),
    telefono: normalizeField(payload.telefono, 80),
    pais: normalizeField(payload.pais, 120),
    solucion: normalizeField(payload.solucion, 180),
    mensaje: String(payload.mensaje || "").trim().slice(0, 3000)
  };
  const requiredFields = ["nombre", "correo", "solucion", "mensaje"];
  const missingField = requiredFields.find((field) => !fields[field]);

  if (missingField) {
    return { error: "Por favor complete los campos obligatorios del formulario." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.correo)) {
    return { error: "Ingrese un correo electrónico válido." };
  }

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
    ["Solución de interés", fields.solucion],
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
    subject: `Nueva solicitud web USCOM - ${fields.solucion}`,
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

  if (url.pathname === "/api/contact" && request.method === "POST") {
    readRequestBody(request)
      .then((body) => {
        const payload = parsePayload(body, request);

        if (normalizeField(payload.website)) {
          sendJson(response, 200, { ok: true });
          return null;
        }

        const email = buildContactEmail(payload, request);

        if (email.error) {
          sendJson(response, 400, { ok: false, message: email.error });
          return null;
        }

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

  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
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
