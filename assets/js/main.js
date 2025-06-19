
$(document).ready(function () {
    // Navbar scroll toggle
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".border-line");
        if (window.scrollY > 10) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

});