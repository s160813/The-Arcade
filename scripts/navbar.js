document.addEventListener("DOMContentLoaded", function() {
    let currentPage = window.location.pathname.split("/").pop(); 
    let links = document.querySelectorAll(".nav-links li a");
    let profileLink = document.querySelector(".profile-icon");

    // Loop door de navbar links en voeg 'active' class toe aan de juiste pagina
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Controleer of de profielpagina actief is
    if (profileLink && profileLink.getAttribute("href") === currentPage) {
        profileLink.classList.add("active");
    }
});