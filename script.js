const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navParents = document.querySelectorAll(".nav-parent");
const brandIntro = document.querySelector("[data-brand-intro]");
const introVideo = document.querySelector("[data-intro-video]");
const languageSwitcher = document.querySelector("[data-language-switcher]");
const languageTrigger = document.querySelector("[data-language-trigger]");
const languageMenu = document.querySelector("[data-language-menu]");
const languageLabel = document.querySelector("[data-language-label]");
const languageNames = {
  es: "Español",
  en: "English"
};
const originalTextNodes = new WeakMap();
let isApplyingLanguage = false;
let languageObserver;
const translationDictionary = {
  en: {
    "Inicio": "Home",
    "Soluciones": "Solutions",
    "Casos de Éxito": "Success Stories",
    "Nosotros": "About Us",
    "Contacto": "Contact",
    "Ciberseguridad": "Cybersecurity",
    "Centros de Datos": "Data Centers",
    "Redes y Telecomunicaciones": "Networks and Telecommunications",
    "Desarrollo de Software": "Software Development",
    "E-Learning": "E-Learning",
    "Cloud": "Cloud",
    "Inteligencia y Analítica": "Intelligence and Analytics",
    "Seguridad Electrónica e IoT": "Electronic Security and IoT",
    "Obra Civil": "Civil Works",
    "Portal Corporativo": "Corporate Portal",
    "Solicitar asesoría": "Request Advisory",
    "Ver soluciones": "View Solutions",
    "Conocer la solución": "Explore Solution",
    "Hablar con un especialista": "Talk to a Specialist",
    "Solicitar información": "Request Information",
    "Ver Proyecto": "View Project",
    "Conozca nuestras soluciones": "Explore Our Solutions",
    "Quiénes Somos": "About Us",
    "Transformamos desafíos tecnológicos en soluciones confiables, seguras e innovadoras.": "We turn technological challenges into reliable, secure and innovative solutions.",
    "Hablemos de su próximo proyecto tecnológico": "Let’s Talk About Your Next Technology Project",
    "Envíenos un mensaje": "Send Us a Message",
    "Nombre completo": "Full Name",
    "Empresa": "Company",
    "Cargo": "Role",
    "Correo electrónico": "Email",
    "Teléfono": "Phone",
    "Mensaje": "Message",
    "Enviar solicitud": "Send Request",
    "Nuestras sedes": "Our Offices",
    "Estados Unidos": "United States",
    "Colombia": "Colombia",
    "Organizaciones que han confiado en nosotros": "Organizations That Have Trusted Us",
    "Aliados tecnológicos": "Technology Partners",
    "Clientes institucionales, corporativos y de misión crítica": "Institutional, corporate and mission-critical clients",
    "Fabricantes y plataformas que respaldan nuestras soluciones": "Manufacturers and platforms that support our solutions",
    "Resumen Ejecutivo": "Executive Summary",
    "Alcance": "Scope",
    "Servicios": "Services",
    "Cliente": "Client",
    "Sector": "Sector",
    "Beneficios": "Benefits",
    "Servicios incluidos": "Included Services",
    "¿Necesita saber cómo aplicar esta solución en su organización?": "Need to know how to apply this solution in your organization?",
    "¿Qué soluciona esta capacidad en cada sector?": "What does this capability solve in each sector?",
    "Gobierno y Entidades Públicas": "Government and Public Entities",
    "Defensa y Seguridad": "Defense and Security",
    "Educación": "Education",
    "Salud": "Healthcare",
    "Telecomunicaciones": "Telecommunications",
    "Infraestructura Crítica": "Critical Infrastructure",
    "Industria, Energía y Servicios Públicos": "Industry, Energy and Utilities",
    "Empresas y Sector Corporativo": "Companies and Corporate Sector",
    "Ciberseguridad · infraestructura · comunicaciones": "Cybersecurity · infrastructure · communications",
    "Tecnología confiable para operaciones de misión crítica": "Reliable technology for mission-critical operations",
    "Integramos soluciones de seguridad, redes, cloud, IoT, colaboración y centro de datos para entidades públicas, defensa y organizaciones que no pueden detenerse.": "We integrate security, networking, cloud, IoT, collaboration and data center solutions for public entities, defense organizations and operations that cannot stop.",
    "Operaciones y soporte para entornos críticos.": "Operations and support for critical environments.",
    "Arquitectura, despliegue, acompañamiento y evolución.": "Architecture, deployment, support and evolution.",
    "Un aliado tecnológico para proteger, conectar y modernizar su organización.": "A technology partner to protect, connect and modernize your organization.",
    "Diseñamos ecosistemas integrados que combinan hardware, software, servicios profesionales y soporte especializado. Nuestro enfoque prioriza disponibilidad, seguridad, trazabilidad y adopción operativa.": "We design integrated ecosystems that combine hardware, software, professional services and specialized support. Our approach prioritizes availability, security, traceability and operational adoption.",
    "Capacidades para toda la plataforma tecnológica": "Capabilities for the entire technology platform",
    "Integramos tecnología de punta con acompañamiento experto para que cada componente funcione como parte de una arquitectura coherente.": "We integrate advanced technology with expert support so every component works as part of a coherent architecture.",
    "Prevención, detección, monitoreo y respuesta ante amenazas digitales.": "Prevention, detection, monitoring and response to digital threats.",
    "Infraestructura robusta, disponible y escalable para operaciones críticas.": "Robust, available and scalable infrastructure for critical operations.",
    "Conectividad segura y de alto rendimiento para sedes, usuarios y nube.": "Secure, high-performance connectivity for sites, users and cloud.",
    "Plataformas digitales seguras, escalables y adaptadas a la operación.": "Secure, scalable digital platforms adapted to operations.",
    "Plataformas para formación, capacitación, evaluación y analítica académica.": "Platforms for education, training, evaluation and academic analytics.",
    "Arquitecturas en nube pública, privada e híbrida para crecer con seguridad.": "Public, private and hybrid cloud architectures to grow securely.",
    "Datos convertidos en conocimiento estratégico para mejores decisiones.": "Data transformed into strategic knowledge for better decisions.",
    "Sistemas conectados de seguridad, monitoreo, automatización y telemetría.": "Connected systems for security, monitoring, automation and telemetry.",
    "Mantenimientos, construcción y atención de siniestros para infraestructura física.": "Maintenance, construction and incident response for physical infrastructure.",
    "Clientes y aliados": "Clients and Partners",
    "Confianza institucional y respaldo tecnológico para proyectos críticos.": "Institutional trust and technology support for critical projects.",
    "Dos ecosistemas que fortalecen nuestra operación: organizaciones que han confiado en USCOM y aliados tecnológicos que amplían nuestras capacidades de integración.": "Two ecosystems strengthen our operation: organizations that have trusted USCOM and technology partners that expand our integration capabilities.",
    "USCOM SAS es una empresa colombiana especializada en el diseño, integración e implementación de soluciones tecnológicas para organizaciones públicas y privadas.": "USCOM SAS is a Colombian company specialized in the design, integration and implementation of technology solutions for public and private organizations.",
    "Acompañamos a nuestros clientes en la modernización de su infraestructura tecnológica mediante proyectos de centros de datos, redes y telecomunicaciones, ciberseguridad, desarrollo de software, plataformas e-learning, servicios en la nube, inteligencia artificial, seguridad electrónica y servicios administrados.": "We support our clients in modernizing their technology infrastructure through data center, networking and telecommunications, cybersecurity, software development, e-learning, cloud, artificial intelligence, electronic security and managed services projects.",
    "Nuestra experiencia nos ha permitido participar en proyectos para entidades gubernamentales, organismos internacionales, empresas del sector privado y organizaciones del sector defensa, ejecutando soluciones adaptadas a las necesidades de cada cliente y alineadas con altos estándares de calidad, disponibilidad y seguridad.": "Our experience has allowed us to participate in projects for government entities, international organizations, private companies and defense organizations, executing solutions adapted to each client’s needs and aligned with high standards of quality, availability and security.",
    "Trabajamos bajo un enfoque consultivo que integra planeación, diseño, implementación, soporte y evolución tecnológica, permitiendo construir soluciones escalables que contribuyen a la continuidad operativa y la transformación digital de las organizaciones.": "We work through a consultative approach that integrates planning, design, implementation, support and technology evolution, enabling scalable solutions that contribute to operational continuity and digital transformation.",
    "Con capacidad para desarrollar proyectos en Colombia, Panamá y Estados Unidos, continuamos fortaleciendo nuestro portafolio mediante alianzas estratégicas con fabricantes líderes y un equipo comprometido con la innovación, la excelencia técnica y la generación de valor para nuestros clientes.": "With the capacity to develop projects in Colombia, Panama and the United States, we continue strengthening our portfolio through strategic alliances with leading manufacturers and a team committed to innovation, technical excellence and value generation.",
    "Formulario de Contacto": "Contact Form",
    "Nuestro equipo está preparado para acompañar a su organización en proyectos de infraestructura tecnológica, centros de datos, telecomunicaciones, ciberseguridad, desarrollo de software, cloud, inteligencia artificial, e-learning y servicios administrados.": "Our team is ready to support your organization in technology infrastructure, data centers, telecommunications, cybersecurity, software development, cloud, artificial intelligence, e-learning and managed services projects.",
    "País": "Country",
    "Solución de interés": "Solution of Interest",
    "Seleccione una opción": "Select an option",
    "Infraestructura TI": "IT Infrastructure",
    "Data Center": "Data Center",
    "Inteligencia Artificial": "Artificial Intelligence",
    "Plataforma E-learning": "E-learning Platform",
    "Seguridad Electrónica": "Electronic Security",
    "Servicios Administrados": "Managed Services",
    "Otro": "Other",
    "Presencia": "Presence",
    "Nuestras Oficinas": "Our Offices",
    "Contamos con presencia internacional para atender proyectos tecnológicos y brindar acompañamiento especializado a organizaciones públicas y privadas.": "We have international presence to support technology projects and provide specialized assistance to public and private organizations.",
    "Capacidades": "Capabilities",
    "Sectores": "Sectors",
    "Seleccione una capacidad": "Select a Capability",
    "Explore cómo cada componente aporta valor técnico y operativo en los sectores donde aplica.": "Explore how each component adds technical and operational value in the sectors where it applies.",
    "¿Qué solucionaría en cada sector?": "What would it solve in each sector?",
    "Diseño pendiente": "Pending Design",
    "Base preparada para desarrollar esta página.": "Base Prepared to Develop This Page.",
    "El siguiente paso es definir contenido real, casos de uso, beneficios, tecnologías, entregables y prueba social para esta opción.": "The next step is to define real content, use cases, benefits, technologies, deliverables and social proof for this option.",
    "Propuesta de valor": "Value Proposition",
    "Alcance técnico": "Technical Scope",
    "Casos de uso": "Use Cases",
    "Experiencia": "Experience",
    "Experiencia que genera confianza": "Experience that Builds Trust",
    "EXPERIENCIA QUE GENERA CONFIANZA": "EXPERIENCE THAT BUILDS TRUST",
    "USCOM SAS ha participado en proyectos tecnolÃ³gicos para organizaciones pÃºblicas, privadas, de seguridad, telecomunicaciones, cooperaciÃ³n internacional e infraestructura tecnolÃ³gica, ejecutando actividades conforme al alcance contractual y los requerimientos tÃ©cnicos definidos para cada proyecto.": "USCOM SAS has participated in technology projects for public, private, security, telecommunications, international cooperation and technology infrastructure organizations, executing activities according to the contractual scope and the technical requirements defined for each project.",
    "USCOM SAS ha participado en proyectos tecnolÃ³gicos para organizaciones pÃºblicas, privadas, de seguridad, telecomunicaciones, cooperaciÃ³n internacional e infraestructura tecnolÃ³gica, ejecutando actividades conforme al alcance contractual y los requerimientos tÃ©cnicos definidos para cada proyecto": "USCOM SAS has participated in technology projects for public, private, security, telecommunications, international cooperation and technology infrastructure organizations, executing activities according to the contractual scope and the technical requirements defined for each project",
    "Estos casos se presentan segÃºn el objeto contractual, el alcance ejecutado, las tecnologÃ­as o componentes realmente implementados, los servicios prestados y el resultado obtenido.": "These cases are presented according to the contractual object, the executed scope, the technologies or components actually implemented, the services provided and the result obtained.",
    "Estos casos se presentan segÃºn el objeto contractual, el alcance ejecutado, las tecnologÃ­as o componentes realmente implementados, los servicios prestados y el resultado obtenido": "These cases are presented according to the contractual object, the executed scope, the technologies or components actually implemented, the services provided and the result obtained",
    "Mensaje principal, dolor que resuelve y diferenciadores de USCOM.": "Main message, pain point solved and USCOM differentiators.",
    "Componentes, arquitectura, servicios, integración y operación.": "Components, architecture, services, integration and operation.",
    "Escenarios concretos por sector y beneficios medibles.": "Specific scenarios by sector and measurable benefits.",
    "Protegemos la información, infraestructura y continuidad operativa de las organizaciones mediante soluciones integrales de prevención, detección, monitoreo y respuesta ante amenazas digitales.": "We protect information, infrastructure and operational continuity through comprehensive prevention, detection, monitoring and response solutions against digital threats.",
    "Protección integral para infraestructuras críticas y entornos empresariales.": "Comprehensive protection for critical infrastructure and business environments.",
    "Diseñamos, implementamos y optimizamos infraestructuras tecnológicas de alto desempeño, orientadas a garantizar disponibilidad, escalabilidad, seguridad y continuidad operativa.": "We design, implement and optimize high-performance technology infrastructures focused on availability, scalability, security and operational continuity.",
    "Infraestructura robusta y escalable para soportar operaciones de misión crítica.": "Robust and scalable infrastructure to support mission-critical operations.",
    "Implementamos soluciones de conectividad seguras y de alto rendimiento para integrar usuarios, sedes, aplicaciones, centros de datos y servicios en la nube.": "We implement secure, high-performance connectivity solutions to integrate users, sites, applications, data centers and cloud services.",
    "Conectividad confiable para organizaciones siempre disponibles.": "Reliable connectivity for always-available organizations.",
    "Diseñamos y desarrollamos plataformas digitales adaptadas a las necesidades operativas y estratégicas de cada organización, utilizando arquitecturas modernas, seguras y escalables.": "We design and develop digital platforms adapted to each organization’s operational and strategic needs, using modern, secure and scalable architectures.",
    "Transformamos procesos y necesidades empresariales en soluciones digitales.": "We transform business processes and needs into digital solutions.",
    "Desarrollamos plataformas integrales para la gestión de procesos de formación, capacitación y evaluación, adaptadas a instituciones educativas, entidades públicas y organizaciones privadas.": "We develop comprehensive platforms for managing education, training and evaluation processes, adapted to educational institutions, public entities and private organizations.",
    "Tecnología para transformar la formación y ampliar el acceso al conocimiento.": "Technology to transform education and expand access to knowledge.",
    "Diseñamos e implementamos arquitecturas en la nube que permiten optimizar recursos tecnológicos, mejorar la disponibilidad y facilitar el crecimiento de las organizaciones.": "We design and implement cloud architectures that optimize technology resources, improve availability and support organizational growth.",
    "Infraestructura flexible, segura y disponible desde cualquier lugar.": "Flexible, secure infrastructure available from anywhere.",
    "Integramos tecnologías para transformar grandes volúmenes de información en conocimiento estratégico, facilitando la identificación de patrones, tendencias, riesgos y oportunidades.": "We integrate technologies to transform large volumes of information into strategic knowledge, making it easier to identify patterns, trends, risks and opportunities.",
    "Convertimos datos en información estratégica para decisiones más inteligentes.": "We turn data into strategic information for smarter decisions.",
    "Integramos sistemas inteligentes de seguridad, monitoreo y automatización que conectan dispositivos, sensores y plataformas para mejorar el control y la eficiencia operativa.": "We integrate intelligent security, monitoring and automation systems that connect devices, sensors and platforms to improve control and operational efficiency.",
    "Entornos conectados, inteligentes y seguros.": "Connected, intelligent and secure environments.",
    "Ejecutamos soluciones de obra civil para mantenimiento, construcción, adecuación y atención de siniestros en infraestructura física, con enfoque técnico, seguro y orientado a la continuidad operativa.": "We execute civil works solutions for maintenance, construction, adaptation and incident response in physical infrastructure, with a technical, safe and continuity-focused approach.",
    "Infraestructura física segura, funcional y preparada para operar.": "Safe, functional physical infrastructure ready to operate.",
    "Ministerio de Relaciones Exteriores de Colombia (Cancillería)": "Ministry of Foreign Affairs of Colombia",
    "Sistema Unificado de Seguridad Exterior (SUSE)": "Unified External Security System (SUSE)",
    "Gobierno": "Government",
    "Ministerio TIC - Findeter": "Ministry of ICT - Findeter",
    "Líneas de Fomento 2.0": "Development Lines 2.0",
    "Central de Inversiones S.A. (CISA)": "Central de Inversiones S.A. (CISA)",
    "Tecnologia de Hiperconvergencia y Virtualizacion": "Hyperconvergence and Virtualization Technology",
    "Infraestructura Tecnológica": "Technology Infrastructure",
    "Organización Internacional para las Migraciones (OIM)": "International Organization for Migration (IOM)",
    "Sistema Integral de CCTV y Control de Acceso.": "Integrated CCTV and Access Control System.",
    "Cooperación Internacional": "International Cooperation",
    "360 Grados Seguridad Ltda.": "360 Grados Seguridad Ltda.",
    "Migración Tecnológica Integral.": "Comprehensive Technology Migration.",
    "Seguridad Privada": "Private Security",
    "Ejército Nacional de Colombia": "National Army of Colombia",
    "Reconstrucción de infraestructura Décima Octava Brigada de Arauca.": "Infrastructure Reconstruction of the Eighteenth Brigade of Arauca.",
    "Defensa": "Defense",
    "© 2026. Todos los derechos reservados.": "© 2026. All rights reserved.",
    "Términos y condiciones.": "Terms and conditions.",
    "Hecho por": "Made by"
  },
  de: {
    "Inicio": "Startseite",
    "Soluciones": "Lösungen",
    "Casos de Éxito": "Erfolgsgeschichten",
    "Nosotros": "Über Uns",
    "Contacto": "Kontakt",
    "Ciberseguridad": "Cybersicherheit",
    "Centros de Datos": "Rechenzentren",
    "Redes y Telecomunicaciones": "Netzwerke und Telekommunikation",
    "Desarrollo de Software": "Softwareentwicklung",
    "E-Learning": "E-Learning",
    "Cloud": "Cloud",
    "Inteligencia y Analítica": "Intelligenz und Analytik",
    "Seguridad Electrónica e IoT": "Elektronische Sicherheit und IoT",
    "Obra Civil": "Bauleistungen",
    "Solicitar asesoría": "Beratung Anfragen",
    "Ver soluciones": "Lösungen Ansehen",
    "Conocer la solución": "Lösung Kennenlernen",
    "Hablar con un especialista": "Mit Einem Spezialisten Sprechen",
    "Solicitar información": "Information Anfordern",
    "Ver Proyecto": "Projekt Ansehen",
    "Conozca nuestras soluciones": "Unsere Lösungen Kennenlernen",
    "Quiénes Somos": "Über Uns",
    "Transformamos desafíos tecnológicos en soluciones confiables, seguras e innovadoras.": "Wir verwandeln technologische Herausforderungen in zuverlässige, sichere und innovative Lösungen.",
    "Hablemos de su próximo proyecto tecnológico": "Sprechen Wir Über Ihr Nächstes Technologieprojekt",
    "Envíenos un mensaje": "Senden Sie Uns Eine Nachricht",
    "Nombre completo": "Vollständiger Name",
    "Empresa": "Unternehmen",
    "Cargo": "Position",
    "Correo electrónico": "E-Mail",
    "Teléfono": "Telefon",
    "Mensaje": "Nachricht",
    "Enviar solicitud": "Anfrage Senden",
    "Nuestras sedes": "Unsere Standorte",
    "Estados Unidos": "Vereinigte Staaten",
    "Colombia": "Kolumbien",
    "Organizaciones que han confiado en nosotros": "Organisationen, Die Uns Vertraut Haben",
    "Aliados tecnológicos": "Technologiepartner",
    "Clientes institucionales, corporativos y de misión crítica": "Institutionelle, unternehmerische und missionskritische Kunden",
    "Fabricantes y plataformas que respaldan nuestras soluciones": "Hersteller und Plattformen, die unsere Lösungen unterstützen",
    "Resumen Ejecutivo": "Executive Summary",
    "Alcance": "Umfang",
    "Servicios": "Dienstleistungen",
    "Cliente": "Kunde",
    "Sector": "Sektor",
    "Beneficios": "Vorteile",
    "Servicios incluidos": "Enthaltene Dienstleistungen",
    "¿Necesita saber cómo aplicar esta solución en su organización?": "Möchten Sie wissen, wie diese Lösung in Ihrer Organisation angewendet werden kann?",
    "¿Qué soluciona esta capacidad en cada sector?": "Was löst diese Fähigkeit in jedem Sektor?",
    "Gobierno y Entidades Públicas": "Regierung und Öffentliche Einrichtungen",
    "Defensa y Seguridad": "Verteidigung und Sicherheit",
    "Educación": "Bildung",
    "Salud": "Gesundheit",
    "Telecomunicaciones": "Telekommunikation",
    "Infraestructura Crítica": "Kritische Infrastruktur",
    "Industria, Energía y Servicios Públicos": "Industrie, Energie und Versorgungsunternehmen",
    "Empresas y Sector Corporativo": "Unternehmen und Unternehmenssektor"
  },
  pt: {
    "Inicio": "Início",
    "Soluciones": "Soluções",
    "Casos de Éxito": "Casos de Sucesso",
    "Nosotros": "Sobre Nós",
    "Contacto": "Contato",
    "Ciberseguridad": "Cibersegurança",
    "Centros de Datos": "Centros de Dados",
    "Redes y Telecomunicaciones": "Redes e Telecomunicações",
    "Desarrollo de Software": "Desenvolvimento de Software",
    "E-Learning": "E-Learning",
    "Cloud": "Cloud",
    "Inteligencia y Analítica": "Inteligência e Analítica",
    "Seguridad Electrónica e IoT": "Segurança Eletrônica e IoT",
    "Obra Civil": "Obra Civil",
    "Solicitar asesoría": "Solicitar Consultoria",
    "Ver soluciones": "Ver Soluções",
    "Conocer la solución": "Conhecer a Solução",
    "Hablar con un especialista": "Falar Com Um Especialista",
    "Solicitar información": "Solicitar Informações",
    "Ver Proyecto": "Ver Projeto",
    "Conozca nuestras soluciones": "Conheça Nossas Soluções",
    "Quiénes Somos": "Sobre Nós",
    "Transformamos desafíos tecnológicos en soluciones confiables, seguras e innovadoras.": "Transformamos desafios tecnológicos em soluções confiáveis, seguras e inovadoras.",
    "Hablemos de su próximo proyecto tecnológico": "Vamos Falar Sobre Seu Próximo Projeto Tecnológico",
    "Envíenos un mensaje": "Envie-nos Uma Mensagem",
    "Nombre completo": "Nome Completo",
    "Empresa": "Empresa",
    "Cargo": "Cargo",
    "Correo electrónico": "E-mail",
    "Teléfono": "Telefone",
    "Mensaje": "Mensagem",
    "Enviar solicitud": "Enviar Solicitação",
    "Nuestras sedes": "Nossos Escritórios",
    "Estados Unidos": "Estados Unidos",
    "Colombia": "Colômbia",
    "Organizaciones que han confiado en nosotros": "Organizações Que Confiaram Em Nós",
    "Aliados tecnológicos": "Aliados Tecnológicos",
    "Clientes institucionales, corporativos y de misión crítica": "Clientes institucionais, corporativos e de missão crítica",
    "Fabricantes y plataformas que respaldan nuestras soluciones": "Fabricantes e plataformas que apoiam nossas soluções",
    "Resumen Ejecutivo": "Resumo Executivo",
    "Alcance": "Escopo",
    "Servicios": "Serviços",
    "Cliente": "Cliente",
    "Sector": "Setor",
    "Beneficios": "Benefícios",
    "Servicios incluidos": "Serviços Incluídos",
    "¿Necesita saber cómo aplicar esta solución en su organización?": "Precisa saber como aplicar esta solução em sua organização?",
    "¿Qué soluciona esta capacidad en cada sector?": "O que esta capacidade soluciona em cada setor?",
    "Gobierno y Entidades Públicas": "Governo e Entidades Públicas",
    "Defensa y Seguridad": "Defesa e Segurança",
    "Educación": "Educação",
    "Salud": "Saúde",
    "Telecomunicaciones": "Telecomunicações",
    "Infraestructura Crítica": "Infraestrutura Crítica",
    "Industria, Energía y Servicios Públicos": "Indústria, Energia e Serviços Públicos",
    "Empresas y Sector Corporativo": "Empresas e Setor Corporativo"
  }
};

const getCurrentLanguage = () => {
  const storedLanguage = window.localStorage.getItem("uscomLanguage");

  if (storedLanguage && languageNames[storedLanguage]) {
    return storedLanguage;
  }

  const ownCookie = document.cookie.match(/(?:^|;\s*)uscomLanguage=([^;]+)/);

  if (ownCookie?.[1] && languageNames[ownCookie[1]]) {
    return ownCookie[1];
  }

  return "es";
};

const cleanLanguageUrl = () => {
  const url = new URL(window.location.href);

  if (!url.searchParams.has("lang")) {
    return;
  }

  url.searchParams.delete("lang");
  window.history.replaceState({}, "", url.toString());
};

const persistSiteLanguage = (language) => {
  const maxAge = 60 * 60 * 24 * 365;
  clearTranslationCookie();
  window.localStorage.setItem("uscomLanguage", language);
  document.cookie = `uscomLanguage=${language};path=/;max-age=${maxAge}`;

  if (window.location.hostname.endsWith("uscom.net.co")) {
    document.cookie = `uscomLanguage=${language};path=/;domain=.uscom.net.co;max-age=${maxAge};SameSite=Lax`;
  }
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const reverseEnglishEntries = Object.entries(translationDictionary.en || {})
  .map(([sourceText, targetText]) => [targetText, sourceText])
  .sort((a, b) => b[0].length - a[0].length);

const recoverSpanishText = (value) => {
  const normalizedText = value.replace(/\s+/g, " ").trim();
  let recoveredText = normalizedText;

  reverseEnglishEntries.forEach(([targetText, sourceText]) => {
    recoveredText = recoveredText.replace(new RegExp(escapeRegExp(targetText), "g"), sourceText);
  });

  return recoveredText;
};

const setTextNodeValue = (node, value) => {
  const leadingSpace = node.nodeValue.match(/^\s*/)?.[0] || "";
  const trailingSpace = node.nodeValue.match(/\s*$/)?.[0] || "";
  node.nodeValue = `${leadingSpace}${value}${trailingSpace}`;
};

const clearTranslationCookie = () => {
  document.cookie = "googtrans=;path=/;max-age=0";
  document.cookie = "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";

  if (window.location.hostname.endsWith("uscom.net.co")) {
    document.cookie = "googtrans=;path=/;domain=.uscom.net.co;max-age=0";
    document.cookie = "googtrans=;path=/;domain=dev.uscom.net.co;max-age=0";
  }

  if (window.location.hostname.includes(".")) {
    document.cookie = `googtrans=;path=/;domain=${window.location.hostname};max-age=0`;
  }
};

const resetStoredLanguage = () => {
  window.localStorage.setItem("uscomLanguage", "es");
  document.cookie = "uscomLanguage=es;path=/;max-age=31536000";

  if (window.location.hostname.endsWith("uscom.net.co")) {
    document.cookie = "uscomLanguage=es;path=/;domain=.uscom.net.co;max-age=31536000;SameSite=Lax";
  }

  clearTranslationCookie();
};

const routeSlugMap = {
  ciberseguridad: "Ciberseguridad",
  "centros-de-datos": "Centros de Datos",
  "redes-y-telecomunicaciones": "Redes y Telecomunicaciones",
  "desarrollo-de-software": "Desarrollo de Software",
  "e-learning": "E-Learning",
  cloud: "Cloud",
  "inteligencia-y-analitica": "Inteligencia y Analítica",
  "seguridad-electronica-e-iot": "Seguridad Electrónica e IoT",
  "obra-civil": "Obra Civil"
};

const getRouteState = () => {
  const params = new URLSearchParams(window.location.search);
  const explicitArea = params.get("area");
  const explicitItem = params.get("item");
  const explicitCase = params.get("case");

  if (explicitArea || explicitItem || explicitCase) {
    return {
      area: explicitArea || "USCOM",
      item: explicitItem || "Página interna",
      caseSlug: explicitCase || ""
    };
  }

  const path = decodeURIComponent(window.location.pathname).replace(/\/+$/, "") || "/";
  const segments = path.split("/").filter(Boolean);

  if (path === "/contacto") {
    return { area: "Contacto", item: "Solicitar Asesoría", caseSlug: "" };
  }

  if (path === "/nosotros") {
    return { area: "Nosotros", item: "Quiénes Somos", caseSlug: "" };
  }

  if (path === "/casos-de-exito") {
    return { area: "Proyectos", item: "Casos de Éxito", caseSlug: "" };
  }

  if (segments[0] === "casos-de-exito" && segments[1]) {
    return { area: "Proyectos", item: "Casos de Éxito", caseSlug: segments[1] };
  }

  if (segments[0] === "soluciones" && routeSlugMap[segments[1]]) {
    return { area: "Soluciones", item: routeSlugMap[segments[1]], caseSlug: "" };
  }

  return { area: "USCOM", item: "Página interna", caseSlug: "" };
};

const preserveLanguageLinks = () => {
  document.querySelectorAll("a[href]").forEach((link) => {
    const rawHref = link.getAttribute("href");

    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("http") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
      return;
    }

    const url = new URL(rawHref, window.location.href);
    url.searchParams.delete("lang");
    link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
  });
};

const updateLanguageControl = (language) => {
  languageLabel.textContent = languageNames[language] || languageNames.es;
  languageMenu.querySelectorAll("[data-language-option]").forEach((button) => {
    const isActive = button.dataset.languageOption === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

const getTranslatableTextNodes = () => {
  const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "SVG", "VIDEO"]);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.nodeValue.replace(/\s+/g, " ").trim();
      const parent = node.parentElement;

      if (!text || text.length < 2 || !parent || ignoredTags.has(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }

      if (parent.closest(".language-switcher, .brand-intro, .intro-video, .hero-bg")) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  let currentNode = walker.nextNode();

  while (currentNode) {
    nodes.push(currentNode);
    currentNode = walker.nextNode();
  }

  return nodes;
};

const restoreOriginalLanguage = () => {
  getTranslatableTextNodes().forEach((node) => {
    const originalText = originalTextNodes.get(node) || recoverSpanishText(node.nodeValue);

    if (originalText) {
      originalTextNodes.set(node, originalText);
      setTextNodeValue(node, originalText);
    }
  });
};

const applyDictionaryTranslation = (language) => {
  const dictionary = translationDictionary[language] || {};
  const dictionaryEntries = Object.entries(dictionary).sort((a, b) => b[0].length - a[0].length);

  getTranslatableTextNodes().forEach((node) => {
    const originalText = originalTextNodes.get(node) || recoverSpanishText(node.nodeValue);
    const normalizedText = originalText.replace(/\s+/g, " ").trim();
    let translatedText = dictionary[normalizedText];

    originalTextNodes.set(node, originalText);

    if (!translatedText) {
      translatedText = normalizedText;
      dictionaryEntries.forEach(([sourceText, targetText]) => {
        translatedText = translatedText.replace(new RegExp(escapeRegExp(sourceText), "g"), targetText);
      });
    }

    if (translatedText) {
      setTextNodeValue(node, translatedText);
    }
  });
};

const applySiteLanguage = (language) => {
  isApplyingLanguage = true;
  persistSiteLanguage(language);

  if (language === "es") {
    clearTranslationCookie();
    restoreOriginalLanguage();
    updateLanguageControl(language);
    isApplyingLanguage = false;
    return;
  }

  restoreOriginalLanguage();
  applyDictionaryTranslation(language);
  updateLanguageControl(language);
  isApplyingLanguage = false;
};

if (languageSwitcher && languageTrigger && languageMenu && languageLabel) {
  const currentLanguage = getCurrentLanguage();
  updateLanguageControl(currentLanguage);
  preserveLanguageLinks();

  const closeLanguageMenu = () => {
    languageMenu.hidden = true;
    languageTrigger.setAttribute("aria-expanded", "false");
  };

  languageMenu.querySelectorAll("[data-language-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLanguage = button.dataset.languageOption;
      closeLanguageMenu();

      if (selectedLanguage === "es") {
        resetStoredLanguage();
        cleanLanguageUrl();
        preserveLanguageLinks();
        restoreOriginalLanguage();
        updateLanguageControl("es");
        window.setTimeout(() => window.location.reload(), 80);
        return;
      }

      applySiteLanguage(selectedLanguage);
      cleanLanguageUrl();
      preserveLanguageLinks();
    });
  });

  languageTrigger.addEventListener("click", () => {
    const isOpen = languageTrigger.getAttribute("aria-expanded") === "true";
    languageMenu.hidden = isOpen;
    languageTrigger.setAttribute("aria-expanded", String(!isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!languageSwitcher.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLanguageMenu();
    }
  });
}

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
const logoCards = document.querySelectorAll(".logo-card");

document.querySelectorAll(".footer").forEach((footer) => {
  footer.innerHTML = `
    <div class="footer-bg" aria-hidden="true"></div>
    <div class="footer-content">
      <p>© 2026. Todos los derechos reservados. <a href="/terminos-y-condiciones">Términos y condiciones.</a></p>
      <div class="footer-made">
        <span>Desarrollado por</span>
        <strong>USCOM S.A.S.</strong>
        <i aria-hidden="true"></i>
        <img src="/assets/uscom-emblem.jpeg" alt="USCOM S.A.S. Gobierno y Defensa" />
      </div>
    </div>`;
});

logoCards.forEach((card) => {
  const image = card.querySelector("img");

  if (!image) {
    card.classList.add("logo-fallback");
    return;
  }

  const showFallback = () => {
    card.classList.add("logo-fallback");
  };

  image.addEventListener("error", showFallback, { once: true });

  if (image.complete && image.naturalWidth === 0) {
    showFallback();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector("button[type='submit']");
    const status = form.querySelector("[data-form-status]");
    const originalButtonText = button.textContent;
    const payload = Object.fromEntries(new FormData(form).entries());

    button.textContent = "Enviando solicitud...";
    button.disabled = true;

    if (status) {
      status.textContent = "";
      status.className = "form-status";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "No fue posible enviar la solicitud.");
      }

      form.reset();
      button.textContent = "Solicitud enviada";
      if (status) {
        status.textContent = "Gracias. Hemos recibido su mensaje y nuestro equipo se pondrá en contacto.";
        status.classList.add("is-success");
      }
    } catch (error) {
      button.textContent = originalButtonText;
      button.disabled = false;
      if (status) {
        status.textContent = error.message || "No fue posible enviar la solicitud. Intente nuevamente.";
        status.classList.add("is-error");
      }
    }
  });
}

if (carousel) {
  const slides = [...carousel.querySelectorAll(".service-card")];
  const carouselShell = carousel.closest("[data-carousel]");
  const getSlideStep = () => slides[0].getBoundingClientRect().width + 18;
  const isAtEnd = () => carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
  const setActiveDot = () => {
    const index = Math.round(carousel.scrollLeft / getSlideStep());
    carouselDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === Math.min(index, slides.length - 1));
    });
  };
  const goNext = () => {
    if (isAtEnd()) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    carousel.scrollBy({ left: getSlideStep(), behavior: "smooth" });
  };
  const goPrev = () => {
    if (carousel.scrollLeft <= 4) {
      carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
      return;
    }

    carousel.scrollBy({ left: -getSlideStep(), behavior: "smooth" });
  };
  let carouselTimer;
  const stopCarousel = () => window.clearInterval(carouselTimer);
  const startCarousel = () => {
    stopCarousel();
    carouselTimer = window.setInterval(goNext, 4500);
  };

  carouselNext.addEventListener("click", () => {
    goNext();
    startCarousel();
  });

  carouselPrev.addEventListener("click", () => {
    goPrev();
    startCarousel();
  });

  carouselDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.carouselDot);
      carousel.scrollTo({ left: getSlideStep() * index, behavior: "smooth" });
      startCarousel();
    });
  });

  carousel.addEventListener("scroll", setActiveDot, { passive: true });
  carouselShell?.addEventListener("mouseenter", stopCarousel);
  carouselShell?.addEventListener("mouseleave", startCarousel);
  carouselShell?.addEventListener("focusin", stopCarousel);
  carouselShell?.addEventListener("focusout", startCarousel);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopCarousel();
      return;
    }

    startCarousel();
  });
  setActiveDot();
  startCarousel();
}

const pageHero = document.querySelector("[data-page-title]");

const sectorApplicationCatalog = {
  gobierno: {
    name: "Gobierno y Entidades Públicas",
    description: "Modernización tecnológica, seguridad, conectividad y continuidad para entidades estatales.",
    icon: '<path d="M3 21h18"/><path d="M5 21V9l7-4 7 4v12"/><path d="M9 21v-7h6v7"/><path d="M9 10h.01"/><path d="M15 10h.01"/>'
  },
  defensa: {
    name: "Defensa y Seguridad",
    description: "Infraestructura confiable para operaciones críticas, comunicaciones y protección institucional.",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-5"/>'
  },
  educacion: {
    name: "Educación",
    description: "Tecnología para instituciones educativas, plataformas virtuales y entornos de aprendizaje.",
    icon: '<path d="m22 10-10-5-10 5 10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/>'
  },
  salud: {
    name: "Salud",
    description: "Soluciones seguras y disponibles para instituciones de salud y gestión de información.",
    icon: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 12 5a5.5 5.5 0 0 0-10 3.5c0 2.3 1.5 4 3 5.5l7 7Z"/><path d="M3.2 12H8l2-3 4 6 2-3h4.8"/>'
  },
  telecomunicaciones: {
    name: "Telecomunicaciones",
    description: "Infraestructura, conectividad y monitoreo para operadores y proveedores de servicios.",
    icon: '<path d="M4.9 19.1a10 10 0 0 1 0-14.2"/><path d="M7.8 16.2a6 6 0 0 1 0-8.4"/><path d="M19.1 4.9a10 10 0 0 1 0 14.2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4"/><circle cx="12" cy="12" r="2"/>'
  },
  infraestructura: {
    name: "Infraestructura Crítica",
    description: "Protección y continuidad para instalaciones y servicios esenciales.",
    icon: '<rect width="14" height="18" x="5" y="3" rx="2"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h6"/><path d="M12 21v-3"/>'
  },
  industria: {
    name: "Industria, Energía y Servicios Públicos",
    description: "Automatización, redes industriales, monitoreo y analítica para operaciones productivas.",
    icon: '<path d="M3 21h18"/><path d="M5 21V8l5 4V8l5 4h4v9"/><path d="M9 17h1"/><path d="M14 17h1"/>'
  },
  empresas: {
    name: "Empresas y Sector Corporativo",
    description: "Soluciones tecnológicas para productividad, seguridad, crecimiento y transformación digital.",
    icon: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/>'
  }
};

const capabilityImpactMessages = {
  "Seguridad perimetral": "controlar accesos externos y tráfico crítico",
  "Firewalls de nueva generación": "inspeccionar aplicaciones, tráfico y amenazas avanzadas",
  "Protección de endpoints": "proteger usuarios, equipos y servidores frente a ataques",
  "Gestión de vulnerabilidades": "detectar brechas técnicas y priorizar correcciones",
  "SIEM": "centralizar eventos, correlacionar alertas y acelerar la respuesta",
  "Hardening": "fortalecer configuraciones y reducir superficies de ataque",
  "Control de acceso": "regular permisos, identidades y trazabilidad de acceso",
  "Respaldo y recuperación": "recuperar información y operación ante fallas o incidentes",
  "Servidores": "soportar cargas críticas con cómputo estable y escalable",
  "Almacenamiento SAN y NAS": "centralizar datos con disponibilidad, rendimiento y protección",
  "Virtualización": "optimizar recursos y desplegar servicios con mayor flexibilidad",
  "Alta disponibilidad": "mantener servicios activos ante fallas de infraestructura",
  "Respaldo": "proteger información clave mediante copias controladas",
  "Recuperación ante desastres": "restaurar operación frente a eventos mayores",
  "Racks": "ordenar la infraestructura física para operación y crecimiento",
  "UPS": "proteger equipos críticos ante fallas eléctricas",
  "Climatización": "preservar condiciones ambientales para equipos críticos",
  "Monitoreo": "supervisar disponibilidad, rendimiento y eventos operativos",
  "Redes LAN y WAN": "conectar sedes, usuarios y aplicaciones con seguridad",
  "Wi-Fi empresarial": "habilitar movilidad segura y conectividad administrada",
  "Switching": "segmentar y distribuir tráfico dentro de la red local",
  "Routing": "dirigir tráfico entre redes, sedes y servicios externos",
  "SD-WAN": "optimizar enlaces, rutas y continuidad entre sedes",
  "Enlaces dedicados": "asegurar conectividad estable para servicios sensibles",
  "Cableado estructurado": "establecer una base física ordenada y certificada",
  "Optimización de red": "mejorar rendimiento, estabilidad y experiencia de usuarios",
  "Aplicaciones web": "digitalizar procesos y centralizar operación desde navegador",
  "Plataformas SaaS": "operar soluciones escalables con menor carga interna",
  "ERP": "integrar procesos administrativos y operativos",
  "CRM": "gestionar relaciones, oportunidades y atención de clientes",
  "Sistemas de gestión": "ordenar flujos, usuarios, procesos e indicadores",
  "Automatización de procesos": "reducir tareas manuales, errores y tiempos de respuesta",
  "Integraciones": "conectar sistemas para eliminar reprocesos y silos de información",
  "APIs": "habilitar comunicación segura entre plataformas",
  "Aplicaciones móviles": "extender procesos a campo, usuarios o clientes",
  "Analítica": "convertir datos operativos en indicadores accionables",
  "LMS personalizados": "gestionar formación con reglas y flujos propios",
  "Gestión de cursos": "organizar contenidos, usuarios, avances y evaluaciones",
  "Aulas virtuales": "habilitar aprendizaje remoto y colaboración académica",
  "Evaluaciones": "medir conocimiento, avance y desempeño",
  "Certificados digitales": "emitir constancias verificables de formación",
  "Contenido interactivo": "mejorar participación y comprensión del aprendizaje",
  "Simuladores técnicos": "entrenar procedimientos y escenarios especializados",
  "Analítica académica": "medir desempeño, permanencia y calidad formativa",
  "Entornos multilingües": "atender usuarios de diferentes idiomas y regiones",
  "Nube pública": "escalar recursos tecnológicos bajo demanda",
  "Nube privada": "mantener mayor control y gobierno de cargas críticas",
  "Nube híbrida": "combinar ambientes locales y cloud con flexibilidad",
  "Migración de cargas": "trasladar aplicaciones o datos con control de riesgo",
  "Infraestructura como servicio": "provisionar cómputo, red y almacenamiento flexible",
  "Respaldo en la nube": "proteger información con copias externas seguras",
  "Contenedores": "desplegar aplicaciones portables y consistentes",
  "Servicios administrados": "operar y evolucionar plataformas con soporte continuo",
  "Inteligencia de negocios": "medir desempeño mediante indicadores claros",
  "Big Data": "procesar grandes volúmenes de información",
  "Analítica avanzada": "anticipar patrones, riesgos y oportunidades",
  "Tableros de control": "visualizar indicadores críticos para seguimiento",
  "Inteligencia artificial": "automatizar análisis y apoyo a decisiones",
  "Correlación de información": "relacionar fuentes para detectar eventos y riesgos",
  "Visualización de datos": "hacer comprensible información compleja",
  "Apoyo a la toma de decisiones": "priorizar acciones con datos confiables",
  "Videovigilancia IP": "monitorear espacios y activos mediante video conectado",
  "Analítica de video": "detectar eventos relevantes automáticamente",
  "Reconocimiento": "identificar personas, objetos o condiciones específicas",
  "Alarmas": "alertar ante eventos de seguridad u operación",
  "Sensores": "capturar variables físicas o ambientales",
  "Monitoreo ambiental": "supervisar condiciones críticas de entorno",
  "Telemetría": "recoger datos remotos de activos y dispositivos",
  "Automatización": "ejecutar acciones programadas o inteligentes",
  "Internet de las Cosas": "conectar dispositivos y plataformas para control inteligente",
  "Mantenimientos": "conservar la infraestructura física en condiciones seguras y operativas",
  "Construcción": "ejecutar adecuaciones y obras con control técnico y seguimiento",
  "Siniestros": "atender daños, contingencias y recuperación de espacios afectados"
};

const getCapabilityImpact = (capability) =>
  capabilityImpactMessages[capability] || "resolver necesidades operativas específicas";

const SectorApplications = (container, sectorKeys, selectedCapability) => {
  if (!container || !sectorKeys?.length) {
    return;
  }

  const grid = container.querySelector("[data-sector-grid]");
  const sectors = sectorKeys
    .map((sector) => {
      const key = typeof sector === "string" ? sector : sector.key;
      const baseSector = sectorApplicationCatalog[key];

      if (!baseSector) {
        return null;
      }

      const baseDescription = sector.description || baseSector.description;
      const capabilityImpact = selectedCapability ? getCapabilityImpact(selectedCapability) : "";
      const description = selectedCapability
        ? `Ayuda a ${capabilityImpact} en este sector. ${baseDescription}`
        : baseDescription;

      return { ...baseSector, description };
    })
    .filter(Boolean);

  grid.innerHTML = sectors
    .map(
      (sector, index) => `
        <article class="sector-application-card${index === 0 ? " is-featured" : ""}" style="--sector-index: ${index + 1}" role="button" tabindex="0" aria-pressed="${index === 0 ? "true" : "false"}">
          <span class="sector-application-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              ${sector.icon}
            </svg>
          </span>
          <div>
            <h3>${sector.name}</h3>
            <p>${sector.description}</p>
          </div>
          <span class="sector-application-line" aria-hidden="true"></span>
        </article>`
    )
    .join("");
  grid.querySelectorAll(".sector-application-card").forEach((card) => {
    const activateCard = () => {
      grid.querySelectorAll(".sector-application-card").forEach((item) => {
        const isCurrent = item === card;
        item.classList.toggle("is-featured", isCurrent);
        item.setAttribute("aria-pressed", String(isCurrent));
      });
    };

    card.addEventListener("click", activateCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateCard();
      }
    });
  });
  container.hidden = sectors.length === 0;
};

const sectorApplication = (key, description) => ({ key, description });

const solutionContent = {
  "Ciberseguridad": {
    image: "/assets/solutions/ciberseguridad.png",
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
    ],
    sectors: [
      sectorApplication("gobierno", "Protección de datos públicos, continuidad digital y cumplimiento para servicios ciudadanos."),
      sectorApplication("defensa", "Defensa de comunicaciones, activos críticos y operaciones institucionales sensibles."),
      sectorApplication("salud", "Seguridad para historias clínicas, sistemas hospitalarios y continuidad asistencial."),
      sectorApplication("telecomunicaciones", "Monitoreo de amenazas, segmentación y protección para redes de operador."),
      sectorApplication("infraestructura", "Prevención, detección y respuesta para servicios esenciales siempre disponibles."),
      sectorApplication("industria", "Protección de redes OT, telemetría y plataformas industriales conectadas."),
      sectorApplication("empresas", "Postura de seguridad integral para datos, usuarios, aplicaciones y operación.")
    ]
  },
  "Centros de Datos": {
    image: "/assets/solutions/centros-datos.png",
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
    ],
    sectors: [
      sectorApplication("gobierno", "Centros de datos resilientes para trámites, información pública y continuidad institucional."),
      sectorApplication("defensa", "Infraestructura de alta disponibilidad para comando, control y operaciones estratégicas."),
      sectorApplication("educacion", "Soporte robusto para campus digitales, laboratorios y servicios académicos."),
      sectorApplication("salud", "Disponibilidad para sistemas clínicos, imágenes médicas y datos sensibles."),
      sectorApplication("telecomunicaciones", "Capacidad escalable para nodos, servicios core y plataformas de red."),
      sectorApplication("infraestructura", "Continuidad física y lógica para instalaciones y servicios esenciales."),
      sectorApplication("industria", "Plataformas estables para supervisión, producción y operación distribuida."),
      sectorApplication("empresas", "Infraestructura preparada para crecimiento, respaldo y operación corporativa.")
    ]
  },
  "Redes y Telecomunicaciones": {
    image: "/assets/solutions/redes-telecomunicaciones.png",
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
    ],
    sectors: [
      sectorApplication("gobierno", "Conectividad segura entre sedes, usuarios, centros de datos y servicios públicos."),
      sectorApplication("defensa", "Redes confiables para comunicaciones tácticas, vigilancia y operación permanente."),
      sectorApplication("educacion", "Wi-Fi, LAN y WAN para aulas, campus, laboratorios y plataformas virtuales."),
      sectorApplication("salud", "Redes disponibles para atención médica, equipos conectados y sistemas clínicos."),
      sectorApplication("telecomunicaciones", "Arquitecturas de alto rendimiento para operadores y proveedores de servicio."),
      sectorApplication("infraestructura", "Conectividad resiliente para servicios esenciales y operación crítica."),
      sectorApplication("industria", "Redes industriales, segmentación y monitoreo para ambientes productivos."),
      sectorApplication("empresas", "Conectividad corporativa segura para usuarios, aplicaciones y nube.")
    ]
  },
  "Desarrollo de Software": {
    image: "/assets/solutions/desarrollo-software.png",
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
    ],
    sectors: [
      sectorApplication("gobierno", "Plataformas para gestión pública, trazabilidad, atención ciudadana y automatización."),
      sectorApplication("educacion", "Sistemas académicos, portales, integraciones y experiencias digitales de aprendizaje."),
      sectorApplication("salud", "Aplicaciones seguras para procesos clínicos, administrativos y gestión de información."),
      sectorApplication("telecomunicaciones", "Portales, integraciones y automatización para operación y atención de servicios."),
      sectorApplication("industria", "Software para control operativo, indicadores, mantenimiento y productividad."),
      sectorApplication("empresas", "Soluciones a medida para procesos, clientes, datos y transformación digital.")
    ]
  },
  "E-Learning": {
    image: "/assets/solutions/e-learning.png",
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
    ],
    sectors: [
      sectorApplication("gobierno", "Capacitación institucional, inducción normativa y formación masiva para funcionarios."),
      sectorApplication("defensa", "Entrenamiento técnico, simuladores y actualización continua para equipos especializados."),
      sectorApplication("educacion", "LMS, aulas virtuales, evaluación y analítica para instituciones educativas."),
      sectorApplication("salud", "Formación clínica, protocolos, certificaciones y actualización del personal asistencial."),
      sectorApplication("empresas", "Universidades corporativas, capacitación comercial, técnica y cumplimiento interno.")
    ]
  },
  "Cloud": {
    image: "/assets/solutions/cloud.png",
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
    ],
    sectors: [
      sectorApplication("gobierno", "Nube segura para modernizar servicios, respaldos y cargas institucionales."),
      sectorApplication("educacion", "Ambientes flexibles para aulas virtuales, investigación y servicios académicos."),
      sectorApplication("salud", "Disponibilidad, respaldo y recuperación para plataformas clínicas y administrativas."),
      sectorApplication("telecomunicaciones", "Elasticidad para servicios digitales, analítica y plataformas de operación."),
      sectorApplication("infraestructura", "Respaldo, continuidad y recuperación para servicios esenciales."),
      sectorApplication("industria", "Escalabilidad para datos operativos, monitoreo y aplicaciones industriales."),
      sectorApplication("empresas", "Migración, optimización y gobierno cloud para crecimiento empresarial.")
    ]
  },
  "Inteligencia y Analítica": {
    image: "/assets/solutions/inteligencia-analitica.png",
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
    ],
    sectors: [
      sectorApplication("gobierno", "Tableros para gestión pública, indicadores, riesgos y toma de decisiones."),
      sectorApplication("defensa", "Correlación de información para análisis operacional, riesgos y escenarios críticos."),
      sectorApplication("educacion", "Analítica académica para desempeño, permanencia, cobertura y calidad educativa."),
      sectorApplication("salud", "Indicadores clínicos, administrativos y operativos para mejorar decisiones."),
      sectorApplication("telecomunicaciones", "Análisis de tráfico, servicio, rendimiento y comportamiento de usuarios."),
      sectorApplication("industria", "Datos productivos convertidos en eficiencia, mantenimiento y control operativo."),
      sectorApplication("empresas", "BI, indicadores y modelos para productividad, clientes y crecimiento.")
    ]
  },
  "Seguridad Electrónica e IoT": {
    image: "/assets/solutions/seguridad-electronica-iot.png",
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
    ],
    sectors: [
      sectorApplication("gobierno", "Monitoreo de sedes, control de acceso y seguridad para espacios institucionales."),
      sectorApplication("defensa", "Vigilancia, sensores y control perimetral para instalaciones estratégicas."),
      sectorApplication("salud", "Control de acceso, monitoreo ambiental y seguridad para áreas sensibles."),
      sectorApplication("telecomunicaciones", "Supervisión de sitios técnicos, energía, acceso y condiciones ambientales."),
      sectorApplication("infraestructura", "Sensores, videoanalítica y monitoreo para activos y servicios esenciales."),
      sectorApplication("industria", "IoT, telemetría y automatización para plantas y operación distribuida."),
      sectorApplication("empresas", "Seguridad electrónica, automatización y control para sedes corporativas.")
    ]
  },
  "Obra Civil": {
    image: "/assets/solutions/obra-civil.png",
    imageAlt: "Obra civil, mantenimiento y atención de siniestros",
    description:
      "Ejecutamos soluciones de obra civil para mantenimiento, construcción, adecuación y atención de siniestros en infraestructura física, con enfoque técnico, seguro y orientado a la continuidad operativa.",
    message: "Infraestructura física segura, funcional y preparada para operar.",
    capabilities: [
      "Mantenimientos",
      "Construcción",
      "Siniestros"
    ],
    benefits: [
      "Conservación y recuperación de espacios e infraestructura.",
      "Ejecución técnica con control de tiempos, alcance y calidad.",
      "Respuesta organizada ante daños, contingencias o siniestros."
    ],
    included: [
      "Evaluación técnica del estado de la infraestructura",
      "Planeación de actividades, alcance y recursos",
      "Ejecución de obra, adecuaciones y mantenimientos",
      "Atención de siniestros, reparación y entrega documentada"
    ],
    sectors: [
      sectorApplication("gobierno", "Mantenimiento y recuperación de sedes, puntos de atención e infraestructura pública."),
      sectorApplication("defensa", "Adecuación, reparación y continuidad física para instalaciones estratégicas."),
      sectorApplication("educacion", "Intervención de aulas, laboratorios, zonas comunes e infraestructura educativa."),
      sectorApplication("salud", "Adecuaciones y reparaciones para áreas asistenciales, administrativas y de soporte."),
      sectorApplication("infraestructura", "Atención de daños, mantenimiento y recuperación de espacios esenciales."),
      sectorApplication("industria", "Intervenciones civiles para operación, seguridad y continuidad productiva."),
      sectorApplication("empresas", "Adecuación, mantenimiento y reparación de sedes corporativas y operativas.")
    ]
  }
};

const renderList = (container, items, renderer) => {
  container.innerHTML = items.map(renderer).join("");
};

const capabilitySummaries = {
  "Seguridad perimetral": "Controla el tráfico entre la red interna y externa para reducir exposición y bloquear accesos no autorizados.",
  "Firewalls de nueva generación": "Permiten inspección avanzada de tráfico, aplicaciones y amenazas para fortalecer la defensa de la organización.",
  "Protección de endpoints": "Protege equipos, servidores y usuarios frente a malware, ransomware y comportamientos sospechosos.",
  "Gestión de vulnerabilidades": "Identifica, prioriza y corrige debilidades técnicas antes de que puedan convertirse en incidentes.",
  "SIEM": "Centraliza eventos de seguridad y facilita la correlación, monitoreo y respuesta ante amenazas.",
  "Hardening": "Fortalece sistemas, servicios y configuraciones para reducir superficies de ataque.",
  "Control de acceso": "Define quién puede acceder a sistemas, espacios o información, con trazabilidad y permisos adecuados.",
  "Respaldo y recuperación": "Protege la información crítica y permite recuperar operación ante fallas, ataques o contingencias.",
  "Servidores": "Plataformas de cómputo diseñadas para soportar aplicaciones, servicios y cargas críticas.",
  "Almacenamiento SAN y NAS": "Infraestructura para guardar, compartir y proteger datos con alto desempeño y disponibilidad.",
  "Virtualización": "Permite consolidar recursos, optimizar infraestructura y desplegar servicios con mayor flexibilidad.",
  "Alta disponibilidad": "Diseño orientado a mantener servicios activos incluso ante fallas de componentes.",
  "Respaldo": "Copias controladas de información y sistemas para proteger la continuidad del negocio.",
  "Recuperación ante desastres": "Estrategia para restaurar servicios críticos después de fallas mayores o eventos inesperados.",
  "Racks": "Organización física de equipos para mejorar operación, seguridad, mantenimiento y crecimiento.",
  "UPS": "Protección eléctrica para mantener equipos críticos activos ante variaciones o cortes de energía.",
  "Climatización": "Control ambiental para preservar el desempeño y vida útil de la infraestructura tecnológica.",
  "Monitoreo": "Supervisión continua de disponibilidad, rendimiento, eventos y condiciones operativas.",
  "Redes LAN y WAN": "Conectan usuarios, sedes y aplicaciones con seguridad, rendimiento y administración centralizada.",
  "Wi-Fi empresarial": "Conectividad inalámbrica segura y administrada para usuarios, invitados y dispositivos corporativos.",
  "Switching": "Interconecta equipos dentro de la red local con control, segmentación y desempeño.",
  "Routing": "Dirige el tráfico entre redes, sedes, internet y servicios de nube de manera eficiente.",
  "SD-WAN": "Optimiza enlaces, disponibilidad y seguridad entre sedes y aplicaciones distribuidas.",
  "Enlaces dedicados": "Conexiones privadas de alta estabilidad para operación crítica y servicios sensibles.",
  "Cableado estructurado": "Base física ordenada y certificada para redes de datos, voz, video y energía.",
  "Optimización de red": "Ajusta rendimiento, disponibilidad y uso de recursos para mejorar la experiencia de usuarios.",
  "Aplicaciones web": "Sistemas accesibles desde navegador para digitalizar procesos y centralizar información.",
  "Plataformas SaaS": "Soluciones en línea listas para operar, escalar y mantenerse con menor carga técnica interna.",
  "ERP": "Integra procesos administrativos, financieros, inventarios y operación en una plataforma común.",
  "CRM": "Gestiona clientes, oportunidades, seguimiento comercial y servicio desde una visión centralizada.",
  "Sistemas de gestión": "Organizan procesos, flujos de trabajo, usuarios e indicadores operativos.",
  "Automatización de procesos": "Reduce tareas manuales, tiempos de respuesta y errores mediante flujos digitales.",
  "Integraciones": "Conectan sistemas y fuentes de datos para que la operación funcione de forma coordinada.",
  "APIs": "Permiten comunicación segura entre aplicaciones, plataformas y servicios externos.",
  "Aplicaciones móviles": "Extienden procesos y servicios a usuarios en campo, clientes o equipos móviles.",
  "Analítica": "Convierte datos operativos en indicadores útiles para seguimiento y decisión.",
  "LMS personalizados": "Plataformas de aprendizaje adaptadas a procesos académicos o corporativos específicos.",
  "Gestión de cursos": "Organiza contenidos, usuarios, rutas de aprendizaje, avances y evaluaciones.",
  "Aulas virtuales": "Espacios digitales para formación, colaboración y seguimiento académico en línea.",
  "Evaluaciones": "Miden conocimientos, desempeño y avance mediante pruebas y actividades controladas.",
  "Certificados digitales": "Emiten constancias verificables para procesos de formación y cumplimiento.",
  "Contenido interactivo": "Material formativo dinámico para mejorar comprensión, retención y participación.",
  "Simuladores técnicos": "Entornos de práctica para entrenar procedimientos, escenarios y habilidades especializadas.",
  "Analítica académica": "Indicadores para medir avance, permanencia, desempeño y calidad de formación.",
  "Entornos multilingües": "Experiencias formativas preparadas para usuarios con diferentes idiomas y regiones.",
  "Nube pública": "Servicios cloud de proveedores globales para escalar recursos bajo demanda.",
  "Nube privada": "Infraestructura cloud dedicada con mayor control, seguridad y gobierno interno.",
  "Nube híbrida": "Combina ambientes locales, privados y públicos según necesidades operativas.",
  "Migración de cargas": "Traslada aplicaciones, datos o servicios hacia nuevos ambientes con control de riesgo.",
  "Infraestructura como servicio": "Recursos de cómputo, red y almacenamiento disponibles de forma flexible.",
  "Respaldo en la nube": "Copias externas seguras para proteger información y facilitar recuperación.",
  "Contenedores": "Empaquetan aplicaciones para desplegarlas de forma portable, consistente y escalable.",
  "Servicios administrados": "Operación, soporte y mejora continua de plataformas tecnológicas.",
  "Inteligencia de negocios": "Modela datos e indicadores para entender desempeño y tomar mejores decisiones.",
  "Big Data": "Procesa grandes volúmenes de información para encontrar patrones, riesgos y oportunidades.",
  "Analítica avanzada": "Aplica modelos y técnicas predictivas para anticipar comportamientos y escenarios.",
  "Tableros de control": "Visualiza indicadores clave en tiempo real o por periodos de análisis.",
  "Inteligencia artificial": "Automatiza análisis, clasificación y apoyo a decisiones mediante modelos inteligentes.",
  "Correlación de información": "Relaciona datos de múltiples fuentes para detectar eventos, patrones o riesgos.",
  "Visualización de datos": "Presenta información compleja de forma clara, comprensible y accionable.",
  "Apoyo a la toma de decisiones": "Convierte datos en criterios útiles para priorizar acciones y recursos.",
  "Videovigilancia IP": "Monitorea espacios mediante cámaras conectadas y gestión centralizada.",
  "Analítica de video": "Detecta eventos, patrones o comportamientos relevantes a partir de imágenes.",
  "Reconocimiento": "Identifica personas, objetos o condiciones según reglas y tecnologías configuradas.",
  "Alarmas": "Genera alertas ante eventos de seguridad, operación o condiciones anómalas.",
  "Sensores": "Capturan variables físicas o ambientales para monitoreo y automatización.",
  "Monitoreo ambiental": "Supervisa temperatura, humedad, energía u otras condiciones críticas.",
  "Telemetría": "Recoge datos remotos de dispositivos, activos o infraestructura conectada.",
  "Automatización": "Ejecuta acciones programadas o inteligentes para mejorar control y eficiencia.",
  "Internet de las Cosas": "Conecta dispositivos, sensores y plataformas para crear entornos inteligentes.",
  "Mantenimientos": "Conserva instalaciones, acabados y componentes físicos para prolongar su vida útil y evitar deterioro operativo.",
  "Construcción": "Ejecuta obras, adecuaciones y mejoras físicas con planeación, control técnico y cumplimiento de alcance.",
  "Siniestros": "Atiende daños por eventos imprevistos, recuperando áreas afectadas y documentando la intervención."
};

const getCapabilitySummary = (capability, solutionName) =>
  capabilitySummaries[capability] ||
  `${capability} es una capacidad clave dentro de ${solutionName}; permite fortalecer la operación, mejorar el control y apoyar una implementación más segura y escalable.`;

const escapeAttribute = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const successCaseFilters = [
  "Todos",
  "Gobierno",
  "Telecomunicaciones",
  "Infraestructura Tecnológica",
  "Cooperación Internacional",
  "Seguridad Privada",
  "Defensa"
];

const renderSuccessList = (items) =>
  items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

const getCardSummary = (description, targetLength) =>
  description.length > targetLength ? description.slice(0, targetLength).trimEnd() : description;

const SuccessCaseCard = (caseItem, summaryLength) => `
  <article class="success-case-card" data-success-category="${escapeAttribute(caseItem.category)}">
    <figure class="success-case-image">
      <img src="${escapeAttribute(caseItem.image)}" alt="${escapeAttribute(caseItem.imageAlt)}" loading="lazy" />
    </figure>
    <div class="success-case-body">
      <p class="success-case-sector">${escapeHtml(caseItem.sector)}</p>
      <h3>${escapeHtml(caseItem.project || caseItem.client)}</h3>
      <p class="success-case-client"><strong>Cliente:</strong> ${escapeHtml(caseItem.client)}</p>
      <p class="success-case-summary">${escapeHtml(getCardSummary(caseItem.description, summaryLength))}</p>
    </div>
    <a class="success-case-link" href="/casos-de-exito/${escapeAttribute(caseItem.slug)}">Ver Proyecto</a>
  </article>
`;

const SuccessProjectPage = (caseItem) => {
  const section = document.querySelector("[data-success-project]");
  const image = document.querySelector("[data-success-project-image]");
  const projectWrap = document.querySelector("[data-success-project-project-wrap]");

  if (!section || !image) {
    return;
  }

  document.title = `${caseItem.project || caseItem.client} | USCOM SAS`;
  document.querySelector("[data-page-area]").textContent = "Casos de Éxito";
  pageHero.textContent = caseItem.project || caseItem.client;
  document.querySelector("[data-page-copy]").textContent = caseItem.description;
  image.src = caseItem.image;
  image.alt = caseItem.imageAlt;
  document.querySelector("[data-success-project-client]").textContent = caseItem.client;
  document.querySelector("[data-success-project-sector]").textContent = caseItem.sector;
  document.querySelector("[data-success-project-project]").textContent = caseItem.project;
  projectWrap.hidden = !caseItem.project;
  document.querySelector("[data-success-project-summary]").textContent = caseItem.description;
  document.querySelector("[data-success-project-scope]").innerHTML = renderSuccessList(caseItem.scope);
  document.querySelector("[data-success-project-services]").innerHTML = renderSuccessList(caseItem.services);
  document.querySelector("[data-success-project-categories]").innerHTML =
    caseItem.categories.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  document.querySelector("[data-generic-content]").hidden = true;
  document.querySelector("[data-solution-content]").hidden = true;
  document.querySelector("[data-success-cases]").hidden = true;
  section.hidden = false;
};

const SuccessCasesGrid = (container, cases, activeFilter = "Todos") => {
  const filteredCases =
    activeFilter === "Todos" ? cases : cases.filter((caseItem) => caseItem.category === activeFilter);
  const summaryLength = Math.min(...cases.map((caseItem) => caseItem.description.length));
  container.innerHTML = filteredCases.map((caseItem) => SuccessCaseCard(caseItem, summaryLength)).join("");
};

const SuccessCasesFilter = (container, grid, cases) => {
  container.innerHTML = successCaseFilters
    .map(
      (filter, index) => `
        <button class="${index === 0 ? "is-active" : ""}" type="button" aria-pressed="${index === 0}" data-success-filter-value="${escapeAttribute(filter)}">
          ${escapeHtml(filter)}
        </button>`
    )
    .join("");

  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.successFilterValue;
      container.querySelectorAll("button").forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });
      SuccessCasesGrid(grid, cases, filter);
    });
  });
};

const renderSuccessCasesPage = () => {
  const section = document.querySelector("[data-success-cases]");
  const grid = document.querySelector("[data-success-grid]");
  const filter = document.querySelector("[data-success-filter]");
  const cases = window.USCOM_SUCCESS_CASES || [];
  const route = getRouteState();
  const selectedCase = cases.find((caseItem) => caseItem.slug === route.caseSlug);

  if (!section || !grid || !filter || !cases.length) {
    return;
  }

  if (selectedCase) {
    SuccessProjectPage(selectedCase);
    return;
  }

  const intro =
    "USCOM SAS ha participado en proyectos tecnológicos para organizaciones públicas, privadas, de seguridad, telecomunicaciones, cooperación internacional e infraestructura tecnológica, ejecutando actividades conforme al alcance contractual y los requerimientos técnicos definidos para cada proyecto.";
  const description =
    "Casos de éxito de USCOM SAS en gobierno, telecomunicaciones, infraestructura tecnológica, cooperación internacional, seguridad privada y defensa.";

  document.title = "Casos de Éxito | USCOM SAS";
  document.querySelector("[data-page-area]").textContent = "Experiencia que genera confianza";
  pageHero.textContent = "Casos de Éxito";
  document.querySelector("[data-page-copy]").textContent = intro;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    document.head.append(metaDescription);
  }
  metaDescription.content = description;

  document.querySelector("[data-generic-content]").hidden = true;
  document.querySelector("[data-solution-content]").hidden = true;
  document.querySelector("[data-success-project]").hidden = true;
  section.hidden = false;
  SuccessCasesGrid(grid, cases);
  SuccessCasesFilter(filter, grid, cases);
};

const setupCapabilityModal = () => {
  const modal = document.querySelector("[data-capability-modal]");
  const title = document.querySelector("[data-modal-title]");
  const copy = document.querySelector("[data-modal-copy]");
  const closeButtons = modal?.querySelectorAll("[data-modal-close]");

  if (!modal || !title || !copy) {
    return;
  }

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll(".capability-item").forEach((item) => {
    const openModal = () => {
      title.textContent = item.dataset.capabilityTitle;
      copy.textContent = item.dataset.capabilitySummary;
      modal.hidden = false;
      document.body.classList.add("modal-open");
      modal.querySelector(".info-modal-close")?.focus();
    };

    item.addEventListener("click", openModal);
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal();
      }
    });
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
};

const setupCapabilitySelector = (solution, solutionName) => {
  const sectorContainer = document.querySelector("[data-sector-applications]");
  const sectorTitle = document.querySelector("[data-sector-title]");

  if (!sectorContainer || !solution.capabilities?.length) {
    return;
  }

  const updateSectorResolution = (capability) => {
    sectorTitle.textContent = `Qué solucionaría ${capability} en cada sector`;
    SectorApplications(sectorContainer, solution.sectors, capability);
  };

  document.querySelectorAll(".capability-item").forEach((item, index) => {
    const selectCapability = () => {
      document.querySelectorAll(".capability-item").forEach((capabilityItem) => {
        capabilityItem.classList.toggle("is-selected", capabilityItem === item);
        capabilityItem.setAttribute("aria-pressed", String(capabilityItem === item));
      });
      updateSectorResolution(item.dataset.capabilityTitle);
    };

    item.addEventListener("click", selectCapability);
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCapability();
      }
    });

    if (index === 0) {
      item.classList.add("is-selected");
      item.setAttribute("aria-pressed", "true");
      updateSectorResolution(item.dataset.capabilityTitle);
    }
  });
};

const renderAboutPage = () => {
  const aboutPage = document.querySelector("[data-about-page]");
  const metaDescriptionText =
    "USCOM SAS es una empresa especializada en infraestructura tecnológica, telecomunicaciones, ciberseguridad, desarrollo de software, cloud, e-learning y servicios administrados para organizaciones públicas y privadas.";

  if (!aboutPage) {
    return;
  }

  document.title = "Quiénes Somos | USCOM SAS";
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    document.head.append(metaDescription);
  }
  metaDescription.content = metaDescriptionText;

  document.querySelector(".page-hero").hidden = true;
  document.querySelector("[data-generic-content]").hidden = true;
  document.querySelector("[data-solution-content]").hidden = true;
  document.querySelector("[data-success-cases]").hidden = true;
  document.querySelector("[data-success-project]").hidden = true;
  aboutPage.hidden = false;
};

const contactOffices = [
  {
    country: "Estados Unidos",
    flagClass: "is-us",
    imageSrc: "/public/images/flags/united-states.webp",
    videoSrc: "assets/flags/colombia-flag.mp4",
    alt: "Bandera Estados Unidos",
    phone: "+1 (954) 218-5550",
    address: [
      "1820 North Corporate Lakes Blvd.",
      "Suite 201",
      "Weston, Florida 33326",
      "Estados Unidos"
    ]
  },
  {
    country: "Colombia",
    flagClass: "is-co",
    imageSrc: "/public/images/flags/colombia.webp",
    videoSrc: "assets/flags/united-states-flag.mp4",
    alt: "Bandera Colombia",
    phone: "+57 (601) 572-6929",
    address: [
      "Calle 74 #15-80",
      "Torre 2 Oficina 211",
      "Edificio Osaka Trade Center",
      "Bogotá D.C., Colombia"
    ]
  }
];

const AnimatedFlag = ({ country, imageSrc, videoSrc, alt, className = "" }) => `
  <div class="animated-flag ${className}" data-country="${escapeAttribute(country)}">
    <video src="${escapeAttribute(videoSrc)}" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>
    <img src="${escapeAttribute(imageSrc)}" alt="${escapeAttribute(alt)}" loading="lazy" />
  </div>
`;

const renderContactPage = () => {
  const contactPage = document.querySelector("[data-contact-page]");
  const officeGrid = document.querySelector("[data-office-grid]");
  const scrollButton = document.querySelector("[data-contact-scroll]");
  const metaDescriptionText =
    "Comuníquese con USCOM SAS para recibir asesoría especializada en infraestructura tecnológica, ciberseguridad, centros de datos, telecomunicaciones, desarrollo de software y soluciones empresariales.";

  if (!contactPage || !officeGrid) {
    return;
  }

  document.title = "Contacto | USCOM SAS";
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    document.head.append(metaDescription);
  }
  metaDescription.content = metaDescriptionText;

  officeGrid.innerHTML = contactOffices
    .map(
      (office) => `
        <article class="office-card">
          ${AnimatedFlag({
            country: office.country,
            imageSrc: office.imageSrc,
            videoSrc: office.videoSrc,
            alt: office.alt,
            className: office.flagClass
          })}
          <div class="office-card-body">
            <h3>${escapeHtml(office.country)}</h3>
            <dl>
              <div>
                <dt>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9Z"/></svg>
                  Teléfono
                </dt>
                <dd>${escapeHtml(office.phone)}</dd>
              </div>
              <div>
                <dt>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Dirección
                </dt>
                <dd>${office.address.map((line) => escapeHtml(line)).join("<br />")}</dd>
              </div>
            </dl>
          </div>
        </article>`
    )
    .join("");

  officeGrid.querySelectorAll(".animated-flag img").forEach((image) => {
    image.addEventListener("load", () => image.classList.add("is-loaded"), { once: true });
    image.addEventListener("error", () => image.classList.add("is-missing"), { once: true });
  });
  officeGrid.querySelectorAll(".animated-flag video").forEach((video) => {
    video.addEventListener("canplay", () => video.classList.add("is-loaded"), { once: true });
    video.addEventListener("error", () => video.classList.add("is-missing"), { once: true });
  });

  scrollButton?.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#contact-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelector(".page-hero").hidden = true;
  document.querySelector("[data-generic-content]").hidden = true;
  document.querySelector("[data-solution-content]").hidden = true;
  document.querySelector("[data-success-cases]").hidden = true;
  document.querySelector("[data-success-project]").hidden = true;
  document.querySelector("[data-about-page]").hidden = true;
  contactPage.hidden = false;
};

if (pageHero) {
  const route = getRouteState();
  const area = route.area;
  const item = route.item;
  const solution = area === "Soluciones" ? solutionContent[item] : null;
  const isSuccessCasesPage = area === "Proyectos" && item === "Casos de Éxito";
  const isAboutPage = area === "Nosotros";
  const isContactPage = area === "Contacto";
  document.title = `${item} | USCOM`;
  document.querySelector("[data-page-area]").textContent = area;
  pageHero.textContent = item;

  if (isContactPage) {
    renderContactPage();
  } else if (isAboutPage) {
    renderAboutPage();
  } else if (isSuccessCasesPage) {
    renderSuccessCasesPage();
  } else if (solution) {
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
      (capability, index) => `
        <article class="capability-item" role="button" tabindex="0" aria-pressed="false" aria-label="Seleccionar ${escapeAttribute(capability)}" data-capability-title="${escapeAttribute(capability)}" data-capability-summary="${escapeAttribute(getCapabilitySummary(capability, item))}">
          <span class="capability-mark" aria-hidden="true"></span>
          <h3>${capability}</h3>
        </article>`
    );
    renderList(
      document.querySelector("[data-benefits]"),
      solution.benefits,
      (benefit) => `<article><span aria-hidden="true"></span><h3>${benefit}</h3></article>`
    );
    renderList(
      document.querySelector("[data-included]"),
      solution.included,
      (service) => `<li>${service}</li>`
    );
    setupCapabilitySelector(solution, item);
    document.querySelector("[data-solution-content]").hidden = false;
    document.querySelector("[data-generic-content]").hidden = true;
  } else {
    document.querySelector("[data-page-copy]").textContent =
      `Esta página queda preparada para diseñar el contenido específico de ${item}: propuesta de valor, alcance, beneficios, casos de uso, arquitectura y llamado a la acción.`;
  }
}

window.addEventListener("load", () => {
  const currentLanguage = getCurrentLanguage();
  persistSiteLanguage(currentLanguage);
  cleanLanguageUrl();
  preserveLanguageLinks();

  if (currentLanguage === "es") {
    restoreOriginalLanguage();
    updateLanguageControl("es");
  } else {
    window.setTimeout(() => {
      applySiteLanguage(currentLanguage);
    }, 700);
  }
});

if (languageSwitcher) {
  languageObserver = new MutationObserver(() => {
    const currentLanguage = getCurrentLanguage();

    if (isApplyingLanguage || currentLanguage === "es") {
      return;
    }

    window.clearTimeout(languageObserver.timer);
    languageObserver.timer = window.setTimeout(() => {
      preserveLanguageLinks();
      applySiteLanguage(currentLanguage);
    }, 120);
  });

  languageObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}
