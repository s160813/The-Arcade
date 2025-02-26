document.addEventListener("DOMContentLoaded", function () {
    let isLoggedIn = false; // Simulatie (kan vervangen worden door localStorage/sessie)

    function showModal(id, message, isLogin = false) {
        // Controleer of modal al bestaat en verwijder deze
        const existingModal = document.getElementById(id);
        if (existingModal) {
            document.body.removeChild(existingModal);
        }

        // Creëer modal
        const modal = document.createElement("section");
        modal.id = id;
        modal.classList.add("modal"); // Koppel CSS-klasse

        const modalContent = document.createElement("article");

        // Sluitknop (X) toevoegen
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "&times;";
        closeButton.classList.add("close-btn");
        closeButton.addEventListener("click", function () {
            document.body.removeChild(modal);
        });

        const text = document.createElement("p");
        text.textContent = message;

        // Maak een container aan voor de knoppen en centreer deze
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // Als het een login-melding is, voeg een "Inloggen"-knop toe
        if (isLogin) {
            const loginButton = document.createElement("a");
            loginButton.textContent = "Inloggen";
            loginButton.href = "../login.html"; // Link naar de loginpagina
            loginButton.classList.add("login-btn");
            buttonContainer.appendChild(loginButton);
        }

        modalContent.appendChild(closeButton);
        modalContent.appendChild(text);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Toon de modal correct als een pop-up venster
        modal.style.display = "flex";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
    }

    function notAvailable(event) {
        event.preventDefault();
        showModal("modal", "Je kan hier niet aan deelnemen.");
    }

    function checkLogin(event) {
        if (!isLoggedIn) {
            event.preventDefault();
            showModal("login-modal", "Je moet eerst inloggen om dit project te openen.", true);
        }
    }

    // Voeg event listeners toe voor niet-beschikbare projecten
    document.querySelectorAll(".projects a").forEach((project) => {
        if (!project.classList.contains("fifa")) {
            project.addEventListener("click", notAvailable);
        }
    });

    // Voeg event listener toe voor FIFA (logincontrole)
    document.querySelector(".fifa").addEventListener("click", checkLogin);
});