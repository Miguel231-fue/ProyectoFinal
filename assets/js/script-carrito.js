// ========= CONTADOR DE VISITAS =========
function contadorVisitas() {
    let visitas = localStorage.getItem("visitas") || 0;
    visitas++;
    localStorage.setItem("visitas", visitas);

    const span = document.getElementById("contadorVisitas");
    if (span) span.textContent = visitas;
}

contadorVisitas();


// ========= ACTUALIZAR CONTADOR DEL CARRITO EN EL ICONO =========
function actualizarIconoCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Tu HTML usa este ID para el carrito
    const badge = document.getElementById("contadorCarrito");

    if (badge) {
        badge.textContent = carrito.length;
    }
}

document.addEventListener("DOMContentLoaded", actualizarIconoCarrito);


// ========= TOAST (NOTIFICACIÓN QUE SE OCULTA SOLA) =========
function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;

    toast.classList.add("toast-show");

    setTimeout(() => {
        toast.classList.remove("toast-show");
    }, 2500);
}


// ========= AGREGAR PRODUCTO AL CARRITO =========
function agregarProducto(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push({ nombre, precio });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarIconoCarrito();
    mostrarToast("Producto agregado: " + nombre);
}


// ========= MOSTRAR CARRITO =========
function mostrarCarrito() {
    const contenedor = document.getElementById("listaCarrito");
    if (!contenedor) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='text-center'>El carrito está vacío.</p>";
        return;
    }

    let html = "";

    carrito.forEach((item, index) => {

        const imagen =
            item.nombre === "Smartphone X" ? "producto1.jpg" :
            item.nombre === "Laptop Pro"   ? "producto2.jpg" :
                                              "producto3.jpg";

        html += `
            <div class="d-flex align-items-center justify-content-between p-3 mb-3 bg-white shadow-sm rounded">

                <div class="d-flex align-items-center gap-3">
                    <img src="assets/img/${imagen}" width="60" class="rounded shadow-sm">

                    <div>
                        <h5 class="m-0">${item.nombre}</h5>
                        <p class="m-0 text-secondary">
                            Precio: $${item.precio.toLocaleString()}
                        </p>
                    </div>
                </div>

                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">
                    Eliminar
                </button>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

mostrarCarrito();


// ========= ELIMINAR UN PRODUCTO =========
function eliminarProducto(i) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(i, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
    actualizarIconoCarrito();
    mostrarToast("Producto eliminado");
}


// ========= VACIAR CARRITO =========
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarIconoCarrito();
    mostrarToast("Carrito vaciado");
}