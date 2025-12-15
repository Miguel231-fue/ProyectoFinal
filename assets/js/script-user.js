const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");

/* CONTEXTO SIMPLE */
let context = {
    saludo: false,
    tema: null
};

function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    userInput.value = "";

    setTimeout(() => {
        const response = iaResponse(text);
        addMessage(response, "ia");
    }, 700);
}

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* ================= IA ================= */

function iaResponse(input) {
    const text = input.toLowerCase();

    /* SALUDOS */
    if (contains(text, ["hola", "buenas", "hey", "saludos"])) {
        context.saludo = true;
        return "¡Hola! 👋 Soy tu asistente virtual. Puedo ayudarte con productos, precios, el carrito o cualquier duda que tengas.";
    }

    /* DESPEDIDAS */
    if (contains(text, ["adiós", "bye", "hasta luego"])) {
        return "¡Hasta luego! 👋 Si necesitas algo más, aquí estaré.";
    }

    /* AYUDA GENERAL */
    if (contains(text, ["ayuda", "necesito ayuda", "no entiendo"])) {
        return "Claro 😊 Dime qué necesitas:\n• Productos\n• Precios\n• Carrito\n• Problemas con la compra";
    }

    /* PRECIOS */
    if (contains(text, ["precio", "cuesta", "vale"])) {
        context.tema = "precios";
        return "Los precios se muestran debajo de cada producto. Si quieres saber el precio de alguno en específico, dime su nombre.";
    }

    /* PRODUCTOS */
    if (contains(text, ["producto", "artículo", "venden", "ofrecen"])) {
        context.tema = "productos";
        return "Ofrecemos productos digitales y físicos seleccionados. Puedes explorarlos y añadirlos al carrito fácilmente.";
    }

    /* CARRITO */
    if (contains(text, ["carrito", "comprar", "pago"])) {
        context.tema = "carrito";
        return "🛒 El carrito guarda los productos que selecciones. Desde allí puedes eliminar artículos o finalizar tu compra.";
    }

    /* PROBLEMAS */
    if (contains(text, ["error", "problema", "no funciona", "fallo"])) {
        return "Lamento que tengas un problema 😕. ¿Ocurre al agregar un producto, en el carrito o al pagar?";
    }

    /* CONTEXTO DE SEGUIMIENTO */
    if (context.tema === "precios") {
        return "Si quieres, dime el nombre del producto y te ayudo a ubicar su precio.";
    }

    if (context.tema === "carrito") {
        return "¿Deseas agregar, eliminar productos o vaciar el carrito?";
    }

    /* RESPUESTA INTELIGENTE POR DEFECTO */
    return generarRespuestaGenerica(text);
}

/* ================= UTILIDADES ================= */

function contains(text, keywords) {
    return keywords.some(word => text.includes(word));
}

function generarRespuestaGenerica(text) {
    if (text.length < 4) {
        return "¿Podrías darme un poco más de información? 🤔";
    }

    return "Entiendo 👍 Estoy analizando tu mensaje. ¿Podrías explicarme un poco más qué necesitas?";
}

userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});