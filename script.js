

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const footer = document.querySelector("footer");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
        
        // Oculta el footer cuando el menú hamburguesa está activo
        if (navMenu.classList.contains("active")) {
            footer.classList.add("footer-hidden");
        } else {
            footer.classList.remove("footer-hidden");
        }
    });
});
