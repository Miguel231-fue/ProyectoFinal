const elements = document.querySelectorAll(".fade-in, .slide-up, .zoom");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
        }
    });
});

elements.forEach(el => observer.observe(el));

// Cambiar header al hacer scroll
const header = document.querySelector(".enhanced-navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Form Alert
const form = document.getElementById("contactForm");
const alertText = document.getElementById("formAlert");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    alertText.textContent = "¡Mensaje enviado correctamente!";
    form.reset();

    setTimeout(() => alertText.textContent = "", 3000);
});