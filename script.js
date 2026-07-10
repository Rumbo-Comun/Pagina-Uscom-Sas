const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navParents = document.querySelectorAll(".nav-parent");

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

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    button.textContent = "Solicitud recibida";
    button.disabled = true;
  });
}

const pageHero = document.querySelector("[data-page-title]");

if (pageHero) {
  const params = new URLSearchParams(window.location.search);
  const area = params.get("area") || "USCOM";
  const item = params.get("item") || "Página interna";
  document.title = `${item} | USCOM`;
  document.querySelector("[data-page-area]").textContent = area;
  pageHero.textContent = item;
  document.querySelector("[data-page-copy]").textContent =
    `Esta página queda preparada para diseñar el contenido específico de ${item}: propuesta de valor, alcance, beneficios, casos de uso, arquitectura y llamado a la acción.`;
}
