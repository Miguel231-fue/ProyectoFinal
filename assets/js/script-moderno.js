// ==== Animaciones de aparición al hacer scroll ====
const reveal = () => {
    const elements = document.querySelectorAll(".fade-in, .fade-up");

    const trigger = window.innerHeight * 0.88;

    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < trigger) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// ==== Botón de seguimiento ====
const followBtn = document.querySelector(".follow-btn");

followBtn.addEventListener("click", () => {
    if (!followBtn.classList.contains("active")) {
        followBtn.classList.add("active");
        followBtn.innerHTML = `<i class="ri-user-shared-line"></i> Siguiendo`;
        followBtn.style.background = "#ffffff";
        followBtn.style.color = "#111";
    } else {
        followBtn.classList.remove("active");
        followBtn.innerHTML = `<i class="ri-user-add-line"></i> Seguir`;
        followBtn.style.background = "#ffd057";
        followBtn.style.color = "#111";
    }
});