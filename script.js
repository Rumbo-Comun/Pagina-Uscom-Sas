const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navParents = document.querySelectorAll(".nav-parent");
const brandIntro = document.querySelector("[data-brand-intro]");
const introVideo = document.querySelector("[data-intro-video]");

if (brandIntro) {
  const introAlreadyPlayed = window.sessionStorage.getItem("uscomIntroPlayed") === "true";
  let introFallback;

  const finishIntro = () => {
    window.clearTimeout(introFallback);
    window.sessionStorage.setItem("uscomIntroPlayed", "true");
    brandIntro.classList.add("is-hidden");
    document.body.classList.remove("is-intro-running");
  };

  const scheduleIntroFallback = () => {
    const videoDuration = introVideo?.duration;
    const fallbackDelay = Number.isFinite(videoDuration) ? (videoDuration + 1.2) * 1000 : 14000;

    window.clearTimeout(introFallback);
    introFallback = window.setTimeout(finishIntro, fallbackDelay);
  };

  if (introAlreadyPlayed) {
    brandIntro.classList.add("is-hidden");
  } else {
    document.body.classList.add("is-intro-running");
    introVideo?.addEventListener("loadedmetadata", scheduleIntroFallback, { once: true });
    introVideo?.addEventListener("ended", finishIntro, { once: true });
    introVideo?.play?.().catch(() => {
      window.setTimeout(finishIntro, 1200);
    });
    scheduleIntroFallback();
  }
}

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navParents.forEach((parent) => {
  parent.addEventListener("click", () => {
    const menu = parent.nextElementSibling;
    const isOpen = parent.getAttribute("aria-expanded") === "true";

    navParents.forEach((otherParent) => {
      if (otherParent !== parent) {
        otherParent.setAttribute("aria-expanded", "false");
        otherParent.nextElementSibling.hidden = true;
      }
    });

    parent.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const contactForm = document.querySelector(".contact-form");
const carousel = document.querySelector("[data-carousel-track]");
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");
const carouselDots = document.querySelectorAll("[data-carousel-dot]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    button.textContent = "Solicitud recibida";
    button.disabled = true;
  });
}

if (carousel) {
  const slides = [...carousel.querySelectorAll(".service-card")];
  const getSlideStep = () => slides[0].getBoundingClientRect().width + 18;
  const setActiveDot = () => {
    const index = Math.round(carousel.scrollLeft / getSlideStep());
    carouselDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === Math.min(index, slides.length - 1));
    });
  };

  carouselNext.addEventListener("click", () => {
    carousel.scrollBy({ left: getSlideStep(), behavior: "smooth" });
  });

  carouselPrev.addEventListener("click", () => {
    carousel.scrollBy({ left: -getSlideStep(), behavior: "smooth" });
  });

  carouselDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.carouselDot);
      carousel.scrollTo({ left: getSlideStep() * index, behavior: "smooth" });
    });
  });

  carousel.addEventListener("scroll", setActiveDot, { passive: true });
  setActiveDot();
}

const pageHero = document.querySelector("[data-page-title]");

const solutionContent = {
  "Ciberseguridad": {
    image: "assets/solutions/ciberseguridad.png",
    imageAlt: "Operaciones de ciberseguridad y monitoreo de amenazas",
    description:
      "Protegemos la información, infraestructura y continuidad operativa de las organizaciones mediante soluciones integrales de prevención, detección, monitoreo y respuesta ante amenazas digitales.",
    message: "Protección integral para infraestructuras críticas y entornos empresariales.",
    capabilities: [
      "Seguridad perimetral",
      "Firewalls de nueva generación",
      "Protección de endpoints",
      "Gestión de vulnerabilidades",
      "SIEM",
      "Hardening",
      "Control de acceso",
      "Respaldo y recuperación"
    ],
    benefits: [
      "Reducción del riesgo operativo y reputacional.",
      "Mayor visibilidad sobre eventos, amenazas y activos críticos.",
      "Respuesta más rápida ante incidentes de seguridad."
    ],
    included: [
      "Diagnóstico de postura de seguridad",
      "Diseño de arquitectura de protección",
      "Implementación de controles y plataformas",
      "Monitoreo, documentación y transferencia de conocimiento"
    ]
  },
  "Centros de Datos": {
    image: "assets/solutions/centros-datos.png",
    imageAlt: "Centro de datos moderno con infraestructura de alto desempeño",
    description:
      "Diseñamos, implementamos y optimizamos infraestructuras tecnológicas de alto desempeño, orientadas a garantizar disponibilidad, escalabilidad, seguridad y continuidad operativa.",
    message: "Infraestructura robusta y escalable para soportar operaciones de misión crítica.",
    capabilities: [
      "Servidores",
      "Almacenamiento SAN y NAS",
      "Virtualización",
      "Alta disponibilidad",
      "Respaldo",
      "Recuperación ante desastres",
      "Racks",
      "UPS",
      "Climatización",
      "Monitoreo"
    ],
    benefits: [
      "Mayor disponibilidad para cargas críticas.",
      "Infraestructura preparada para crecer sin perder control.",
      "Continuidad operativa ante fallas o contingencias."
    ],
    included: [
      "Evaluación de capacidad e infraestructura",
      "Diseño físico y lógico del centro de datos",
      "Implementación, pruebas y puesta en operación",
      "Plan de respaldo, continuidad y monitoreo"
    ]
  },
  "Redes y Telecomunicaciones": {
    image: "assets/solutions/redes-telecomunicaciones.png",
    imageAlt: "Redes empresariales y telecomunicaciones de alto rendimiento",
    description:
      "Implementamos soluciones de conectividad seguras y de alto rendimiento para integrar usuarios, sedes, aplicaciones, centros de datos y servicios en la nube.",
    message: "Conectividad confiable para organizaciones siempre disponibles.",
    capabilities: [
      "Redes LAN y WAN",
      "Wi-Fi empresarial",
      "Switching",
      "Routing",
      "SD-WAN",
      "Enlaces dedicados",
      "Cableado estructurado",
      "Monitoreo",
      "Optimización de red"
    ],
    benefits: [
      "Conectividad estable entre sedes, usuarios y aplicaciones.",
      "Mejor rendimiento de servicios internos y cloud.",
      "Gestión más segura del tráfico corporativo."
    ],
    included: [
      "Diseño de topología y segmentación",
      "Implementación de equipos y enlaces",
      "Pruebas de rendimiento y disponibilidad",
      "Monitoreo, optimización y soporte"
    ]
  },
  "Desarrollo de Software": {
    image: "assets/solutions/desarrollo-software.png",
    imageAlt: "Equipo desarrollando plataformas digitales empresariales",
    description:
      "Diseñamos y desarrollamos plataformas digitales adaptadas a las necesidades operativas y estratégicas de cada organización, utilizando arquitecturas modernas, seguras y escalables.",
    message: "Transformamos procesos y necesidades empresariales en soluciones digitales.",
    capabilities: [
      "Aplicaciones web",
      "Plataformas SaaS",
      "ERP",
      "CRM",
      "Sistemas de gestión",
      "Automatización de procesos",
      "Integraciones",
      "APIs",
      "Aplicaciones móviles",
      "Analítica"
    ],
    benefits: [
      "Procesos más ágiles, trazables y medibles.",
      "Soluciones ajustadas a la operación real de la organización.",
      "Arquitecturas listas para integrarse y escalar."
    ],
    included: [
      "Levantamiento funcional y técnico",
      "Diseño UX/UI y arquitectura",
      "Desarrollo, pruebas e integración",
      "Documentación, despliegue y soporte evolutivo"
    ]
  },
  "E-Learning": {
    image: "assets/solutions/e-learning.png",
    imageAlt: "Plataforma de aprendizaje digital y aulas virtuales",
    description:
      "Desarrollamos plataformas integrales para la gestión de procesos de formación, capacitación y evaluación, adaptadas a instituciones educativas, entidades públicas y organizaciones privadas.",
    message: "Tecnología para transformar la formación y ampliar el acceso al conocimiento.",
    capabilities: [
      "LMS personalizados",
      "Gestión de cursos",
      "Aulas virtuales",
      "Evaluaciones",
      "Certificados digitales",
      "Contenido interactivo",
      "Simuladores técnicos",
      "Analítica académica",
      "Entornos multilingües"
    ],
    benefits: [
      "Mayor cobertura y control de procesos formativos.",
      "Seguimiento claro de desempeño, avance y certificación.",
      "Experiencias de aprendizaje más flexibles y escalables."
    ],
    included: [
      "Diseño de plataforma y flujos académicos",
      "Configuración de cursos, roles y evaluaciones",
      "Integración de contenidos y certificados",
      "Analítica, capacitación y soporte"
    ]
  },
  "Cloud": {
    image: "assets/solutions/cloud.png",
    imageAlt: "Arquitectura cloud híbrida y servicios en la nube",
    description:
      "Diseñamos e implementamos arquitecturas en la nube que permiten optimizar recursos tecnológicos, mejorar la disponibilidad y facilitar el crecimiento de las organizaciones.",
    message: "Infraestructura flexible, segura y disponible desde cualquier lugar.",
    capabilities: [
      "Nube pública",
      "Nube privada",
      "Nube híbrida",
      "Migración de cargas",
      "Infraestructura como servicio",
      "Respaldo en la nube",
      "Recuperación ante desastres",
      "Contenedores",
      "Servicios administrados"
    ],
    benefits: [
      "Escalabilidad según demanda y necesidades de negocio.",
      "Mayor disponibilidad de servicios y aplicaciones.",
      "Optimización de costos, respaldo y continuidad."
    ],
    included: [
      "Assessment cloud y plan de migración",
      "Diseño de arquitectura segura",
      "Implementación de cargas, respaldo y continuidad",
      "Gobierno, monitoreo y operación administrada"
    ]
  },
  "Inteligencia y Analítica": {
    image: "assets/solutions/inteligencia-analitica.png",
    imageAlt: "Analítica de datos e inteligencia de negocios",
    description:
      "Integramos tecnologías para transformar grandes volúmenes de información en conocimiento estratégico, facilitando la identificación de patrones, tendencias, riesgos y oportunidades.",
    message: "Convertimos datos en información estratégica para decisiones más inteligentes.",
    capabilities: [
      "Inteligencia de negocios",
      "Big Data",
      "Analítica avanzada",
      "Tableros de control",
      "Inteligencia artificial",
      "Correlación de información",
      "Visualización de datos",
      "Apoyo a la toma de decisiones"
    ],
    benefits: [
      "Decisiones basadas en información confiable y oportuna.",
      "Identificación de tendencias, riesgos y oportunidades.",
      "Mejor gobierno y visualización de indicadores críticos."
    ],
    included: [
      "Modelamiento y calidad de datos",
      "Diseño de indicadores y tableros",
      "Integración de fuentes y analítica",
      "Capacitación, documentación y mejora continua"
    ]
  },
  "Seguridad Electrónica e IoT": {
    image: "assets/solutions/seguridad-electronica-iot.png",
    imageAlt: "Seguridad electrónica, sensores e IoT conectados",
    description:
      "Integramos sistemas inteligentes de seguridad, monitoreo y automatización que conectan dispositivos, sensores y plataformas para mejorar el control y la eficiencia operativa.",
    message: "Entornos conectados, inteligentes y seguros.",
    capabilities: [
      "Videovigilancia IP",
      "Analítica de video",
      "Control de acceso",
      "Reconocimiento",
      "Alarmas",
      "Sensores",
      "Monitoreo ambiental",
      "Telemetría",
      "Automatización",
      "Internet de las Cosas"
    ],
    benefits: [
      "Mayor control sobre espacios, activos y operación.",
      "Monitoreo inteligente de eventos y condiciones críticas.",
      "Automatización para mejorar eficiencia y seguridad."
    ],
    included: [
      "Diseño de arquitectura electrónica e IoT",
      "Implementación de dispositivos, sensores y plataformas",
      "Integración con monitoreo y analítica",
      "Soporte, mantenimiento y documentación"
    ]
  }
};

const renderList = (container, items, renderer) => {
  container.innerHTML = items.map(renderer).join("");
};

if (pageHero) {
  const params = new URLSearchParams(window.location.search);
  const area = params.get("area") || "USCOM";
  const item = params.get("item") || "Página interna";
  const solution = area === "Soluciones" ? solutionContent[item] : null;
  document.title = `${item} | USCOM`;
  document.querySelector("[data-page-area]").textContent = area;
  pageHero.textContent = item;

  if (solution) {
    document.querySelector("[data-page-copy]").textContent = solution.description;
    document.querySelector("[data-solution-message]").textContent = solution.message;
    const visual = document.querySelector("[data-page-visual]");
    const visualImage = document.querySelector("[data-solution-image]");
    visualImage.src = solution.image;
    visualImage.alt = solution.imageAlt;
    visual.hidden = false;
    document.querySelector("[data-solution-intro]").textContent =
      `Estas capacidades permiten implementar ${item} con una visión integral, segura y preparada para operar.`;
    renderList(
      document.querySelector("[data-capabilities]"),
      solution.capabilities,
      (capability) => `<span>${capability}</span>`
    );
    renderList(
      document.querySelector("[data-benefits]"),
      solution.benefits,
      (benefit, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${benefit}</h3></article>`
    );
    renderList(
      document.querySelector("[data-included]"),
      solution.included,
      (service) => `<li>${service}</li>`
    );
    document.querySelector("[data-solution-content]").hidden = false;
    document.querySelector("[data-generic-content]").hidden = true;
  } else {
    document.querySelector("[data-page-copy]").textContent =
      `Esta página queda preparada para diseñar el contenido específico de ${item}: propuesta de valor, alcance, beneficios, casos de uso, arquitectura y llamado a la acción.`;
  }
}
