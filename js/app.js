"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );
      toggle.textContent = isOpen ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Ouvrir le menu");
        toggle.textContent = "☰";
      });
    });
  }

  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Ajoute une animation discrète à l'apparition des cartes.
  const cards = document.querySelectorAll(".project-card, .service-card");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(function (card) {
      card.style.opacity = "0";
      card.style.transform = "translateY(10px)";
      card.style.transition = "opacity .45s ease, transform .45s ease";
      observer.observe(card);
    });

    const style = document.createElement("style");
    style.textContent =
      ".is-visible{opacity:1!important;transform:translateY(0)!important}";
    document.head.appendChild(style);
  }
});
