"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.elements.namedItem("name")?.value.trim() || "";
    const email = form.elements.namedItem("email")?.value.trim() || "";
    const subject = form.elements.namedItem("subject")?.value.trim() || "";
    const message = form.elements.namedItem("message")?.value.trim() || "";

    if (!name || !message) {
      showFeedback("Remplis ton nom et ton message.", true);
      return;
    }

    const text = [
      "Bonjour Jason Aloma !",
      "",
      "Nom : " + name,
      "E-mail : " + (email || "Non renseigné"),
      "Sujet : " + (subject || "Demande d'information"),
      "",
      "Message :",
      message
    ].join("\n");

    const url = "https://wa.me/243847500590?text=" +
      encodeURIComponent(text);

    showFeedback("Ouverture de WhatsApp pour envoyer ton message.", false);
    window.open(url, "_blank", "noopener,noreferrer");
  });

  function showFeedback(message, isError) {
    if (!feedback) {
      if (isError) alert(message);
      return;
    }

    feedback.textContent = message;
    feedback.setAttribute("role", "status");
    feedback.style.color = isError ? "#ff8c8c" : "#00d4ff";
  }
});
