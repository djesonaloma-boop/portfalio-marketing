"use strict";

async function loadCases(targetSelector = "#casesList") {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  try {
    const response = await fetch("data/cases.json");
    if (!response.ok) throw new Error("Impossible de charger les projets.");

    const cases = await response.json();
    target.replaceChildren();

    cases.forEach(function (item) {
      const article = document.createElement("article");
      article.className = "project-card";

      const imageBox = document.createElement("div");
      imageBox.className = "project-image";

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.title || "Image du projet";
      image.loading = "lazy";
      image.onerror = function () {
        image.style.display = "none";
      };
      imageBox.appendChild(image);

      const content = document.createElement("div");
      content.className = "project-content";

      const number = document.createElement("span");
      number.className = "project-number";
      number.textContent = item.category || "PROJET";

      const title = document.createElement("h3");
      title.textContent = item.title;

      const description = document.createElement("p");
      description.textContent = item.description;

      const link = document.createElement("a");
      link.className = "btn btn-primary btn-small";
      link.href = item.url;
      link.textContent = "Découvrir le projet ↗";

      content.append(number, title, description, link);
      article.append(imageBox, content);
      target.appendChild(article);
    });
  } catch (error) {
    target.textContent =
      "Les projets ne peuvent pas être chargés pour le moment. Ouvre le site depuis un hébergement web pour activer le chargement JSON.";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector("#casesList")) loadCases();
});
