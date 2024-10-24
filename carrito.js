// Seleccionamos los elementos del DOM que necesitamos
const mensajeCarrito = document.getElementById('mensaje-carrito');
const totalCarrito = document.getElementById('total-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const contenidoCarrito = document.getElementById('contenido-carrito');
const totalFinal = document.getElementById('total-acumulado'); // Asegúrate de que este elemento esté en tu HTML

// Obtén el carrito desde LocalStorage o crea uno nuevo si no existe
let carritoItems = JSON.parse(localStorage.getItem('carrito')) || [];
let total = carritoItems.reduce((acc, item) => acc + item.precio, 0);
totalCarrito.textContent = `$${total.toFixed(2)}`;

// Al cargar la página, actualizamos el carrito con los datos almacenados
window.onload = function() {
    actualizarCarrito();
};

// Función para agregar artículos al carrito
function agregarAlCarrito(precio, nombre) {
    total += precio;
    totalCarrito.textContent = `$${total.toFixed(2)}`;
    carritoItems.push({ nombre, precio });
    mostrarMensajeCarrito(nombre, precio);
    actualizarCarrito();
    guardarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = ''; // Limpiamos el contenido anterior
    carritoItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.className = 'boton-eliminar'; // Asegúrate de tener estilos para este botón
        eliminarBtn.onclick = () => eliminarDelCarrito(index);
        
        li.appendChild(eliminarBtn);
        listaCarrito.appendChild(li);
    });
    totalFinal.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar artículos del carrito
function eliminarDelCarrito(index) {
    total -= carritoItems[index].precio; // Resta el precio del total
    carritoItems.splice(index, 1); // Elimina el artículo del carrito
    totalCarrito.textContent = `$${total.toFixed(2)}`; // Actualiza el total visible
    actualizarCarrito(); // Actualiza la vista del carrito
    guardarCarrito(); // Guarda los cambios en localStorage
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carritoItems));
}

// Mostrar el mensaje de confirmación al agregar artículos al carrito
function mostrarMensajeCarrito(nombre, precio) {
    mensajeCarrito.textContent = `${nombre} agregado al carrito por $${precio.toFixed(2)}!`;
    mensajeCarrito.style.display = 'block';
    setTimeout(() => {
        mensajeCarrito.style.display = 'none';
    }, 2000);
}

// Mostrar u ocultar el contenido del carrito
document.getElementById('icono-carrito').addEventListener('click', function() {
    if (contenidoCarrito.style.display === 'none' || contenidoCarrito.style.display === '') {
        contenidoCarrito.style.display = 'block';
    } else {
        contenidoCarrito.style.display = 'none';
    }
});

// Función para comenzar el proceso de pago
function comenzarPago() {
    alert("Iniciando el proceso de pago...");
}
