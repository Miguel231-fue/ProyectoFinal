function mostrarImagen(event) {
    const imagen = document.getElementById('ver-imagen');
    imagen.src = URL.createObjectURL(event.target.files[0]);
    imagen.style.display = "block";
}

function marcarError(elem) {
    elem.style.border = "2px solid #e74c3c";
    elem.style.boxShadow = "0 0 6px rgba(231,76,60,0.25)";
}

function limpiarError(elem) {
    elem.style.border = "";
    elem.style.boxShadow = "";
}

document.getElementById("registro").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const nombreEl = document.getElementById("nombre");
    const apellidoEl = document.getElementById("apellido");
    const correoEl = document.getElementById("correo");
    const passwordEl = document.getElementById("password");
    const confirmarEl = document.getElementById("confirmar");
    const fechaEl = document.getElementById("fecha");
    const imagenEl = document.getElementById("imagen");

    const nombre = nombreEl.value.trim();
    const apellido = apellidoEl.value.trim();
    const correo = correoEl.value.trim();
    const password = passwordEl.value;
    const confirmar = confirmarEl.value;
    const fecha = fechaEl.value;
    const archivo = imagenEl.files[0];

    [nombreEl, apellidoEl, correoEl, passwordEl, confirmarEl, fechaEl, imagenEl].forEach(el => limpiarError(el));

    if (nombre === "") {
        alert("Debes ingresar un nombre.");
        marcarError(nombreEl);
        nombreEl.focus();
        return;
    }

    if (apellido === "") {
        alert("Debes ingresar un apellido.");
        marcarError(apellidoEl);
        apellidoEl.focus();
        return;
    }

    if (correo === "") {
        alert("Debes ingresar un correo.");
        marcarError(correoEl);
        correoEl.focus();
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        alert("Ingresa un correo válido.");
        marcarError(correoEl);
        correoEl.focus();
        return;
    }

    if (password === "") {
        alert("Debes ingresar una contraseña.");
        marcarError(passwordEl);
        passwordEl.focus();
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        marcarError(passwordEl);
        passwordEl.focus();
        return;
    }

    if (confirmar === "") {
        alert("Debes confirmar la contraseña.");
        marcarError(confirmarEl);
        confirmarEl.focus();
        return;
    }

    if (password !== confirmar) {
        alert("Las contraseñas no coinciden. Corrige por favor.");
        marcarError(passwordEl);
        marcarError(confirmarEl);
        passwordEl.focus();
        return;
    }

    if (fecha === "") {
        alert("Debes ingresar tu fecha de nacimiento.");
        marcarError(fechaEl);
        fechaEl.focus();
        return;
    }

    if (!archivo) {
        alert("Debes subir una imagen de perfil.");
        marcarError(imagenEl);
        imagenEl.focus();
        return;
    }

    const tiposValidos = ["image/png", "image/jpeg"];
    if (!tiposValidos.includes(archivo.type)) {
        alert("La imagen debe ser JPG o PNG.");
        marcarError(imagenEl);
        imagenEl.focus();
        return;
    }

    alert("Registro exitoso 🙂");
});