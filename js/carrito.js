const productos = {
  arosZaira: { id: 'arosZaira', nombre: 'Aros Zaira', precio: 25000, imagen: './images/Catalogo/arosflor.webp' },
  arosBrisa: { id: 'arosBrisa', nombre: 'Aros Brisa', precio: 20000, imagen: './images/Catalogo/aros.jpg' },
  arosCaracol: { id: 'arosCaracol', nombre: 'Set Aros Caracol', precio: 27500, imagen: './images/Catalogo/arosset.jpg' },
  anilloZafiro: { id: 'anilloZafiro', nombre: 'Anillo Zafiro', precio: 15700, imagen: './images/Catalogo/anillo1.jpg' },
  anilloEclipse: { id: 'anilloEclipse', nombre: 'Anillo Eclipse', precio: 19900, imagen: './images/Catalogo/anillodorado.jpg' },
  anilloJoy: { id: 'anilloJoy', nombre: 'Set Anillos Joy', precio: 24600, imagen: './images/Catalogo/anilloset.jpg' },
  collarJuliet: { id: 'collarJuliet', nombre: 'Collar Juliet', precio: 23000, imagen: './images/Catalogo/collar.jpg' },
  collarBrisa: { id: 'collarBrisa', nombre: 'Collar Brisa', precio: 35000, imagen: './images/Catalogo/collar1.jpg' },
  collarSun: { id: 'collarSun', nombre: 'Collar Sun', precio: 22700, imagen: './images/Catalogo/collarsol.jpg' },
  pulseraCamila: { id: 'pulseraCamila', nombre: 'Pulsera Camila', precio: 18900, imagen: './images/Catalogo/pulsera1.jpg' },
  pulseraSophie: { id: 'pulseraSophie', nombre: 'Pulsera Sophie', precio: 21000, imagen: './images/Catalogo/pulsera2.jpg' },
  pulseraMartina: { id: 'pulseraMartina', nombre: 'Set Pulseras Martina', precio: 34600, imagen: './images/Catalogo/pulseraset.jpg' }
};

let carrito = [];

// Función guardar el carrito
function guardarCarrito() {
}

// Función cargar carrito
function cargarCarrito() {
}

// Toast notification
function mostrarToast(mensaje) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = mensaje;
  
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('mostrar'), 10);
  
  setTimeout(() => {
    toast.classList.remove('mostrar');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Función agregar producto (CREATE)
function agregarAlCarrito(idProducto) {
  const producto = productos[idProducto];
  const itemExistente = carrito.find(item => item.id === idProducto);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  guardarCarrito();
  actualizarContadorCarrito();
  mostrarToast(`✓ ${producto.nombre} agregado al carrito`);
}

// Función mostrar carrito (READ)
function mostrarCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  const totalDiv = document.getElementById('total');

  if (!listaCarrito) return;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<div class="carrito-vacio"><p>Tu carrito está vacío</p></div>';
    if (totalDiv) totalDiv.innerHTML = '';
    return;
  }

  let html = '<div class="carrito-items">';

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    html += `
      <div class="carrito-item">
        <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img">
        <div class="carrito-item-info">
          <h3>${item.nombre}</h3>
          <p class="carrito-item-precio">$${item.precio.toLocaleString('es-AR')}</p>
        </div>
        <div class="carrito-item-controles">
          <button onclick="disminuirCantidad('${item.id}')" class="btn-cantidad">-</button>
          <span class="cantidad">${item.cantidad}</span>
          <button onclick="aumentarCantidad('${item.id}')" class="btn-cantidad">+</button>
        </div>
        <div class="carrito-item-subtotal">
          <p>Subtotal: $${subtotal.toLocaleString('es-AR')}</p>
          <button onclick="eliminarDelCarrito('${item.id}')" class="btn-eliminar">Eliminar</button>
        </div>
      </div>
    `;
  });

  html += '</div>';
  listaCarrito.innerHTML = html;

  if (totalDiv) {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalDiv.innerHTML = `
      <div class="carrito-total">
        <h3>Total: $${total.toLocaleString('es-AR')}</h3>
        <button class="btn-finalizar" onclick="finalizarCompra()">Finalizar Compra</button>
      </div>
    `;
  }
}

// Función actualizar estado
function actualizarEstadoCarrito() {
  guardarCarrito();
  mostrarCarrito();
  actualizarContadorCarrito();
}

// Funciones modificar cantidad (UPDATE)
function aumentarCantidad(idProducto) {
  const item = carrito.find(item => item.id === idProducto);
  if (item) {
    item.cantidad++;
    actualizarEstadoCarrito();
  }
}

function disminuirCantidad(idProducto) {
  const item = carrito.find(item => item.id === idProducto);
  if (item) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      eliminarDelCarrito(idProducto);
      return;
    }
    actualizarEstadoCarrito();
  }
}

// Función eliminar producto (DELETE)
function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(item => item.id !== idProducto);
  actualizarEstadoCarrito();
  mostrarToast('✓ Producto eliminado del carrito');
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const contadorElement = document.getElementById('contador-carrito');
  if (contadorElement) {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorElement.textContent = totalItems;
  }
}

// Función finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  alert(`¡Gracias por tu compra!\nTotal: $${total.toLocaleString('es-AR')}.`);
  
  carrito = [];
  actualizarEstadoCarrito();
}

// Eventos botones e inicialización
document.addEventListener('DOMContentLoaded', function() {
  cargarCarrito();

  if (document.getElementById('botonArosZaira')) {
    document.getElementById('botonArosZaira').addEventListener('click', () => agregarAlCarrito('arosZaira'));
    document.getElementById('botonArosBrisa').addEventListener('click', () => agregarAlCarrito('arosBrisa'));
    document.getElementById('botonArosCaracol').addEventListener('click', () => agregarAlCarrito('arosCaracol'));
    document.getElementById('botonAnilloZafiro').addEventListener('click', () => agregarAlCarrito('anilloZafiro'));
    document.getElementById('botonAnilloEclipse').addEventListener('click', () => agregarAlCarrito('anilloEclipse'));
    document.getElementById('botonAnilloJoy').addEventListener('click', () => agregarAlCarrito('anilloJoy'));
    document.getElementById('botonCollarJuliet').addEventListener('click', () => agregarAlCarrito('collarJuliet'));
    document.getElementById('botonCollarBrisa').addEventListener('click', () => agregarAlCarrito('collarBrisa'));
    document.getElementById('botonCollarSun').addEventListener('click', () => agregarAlCarrito('collarSun'));
    document.getElementById('botonPulseraCamila').addEventListener('click', () => agregarAlCarrito('pulseraCamila'));
    document.getElementById('botonPulseraSophie').addEventListener('click', () => agregarAlCarrito('pulseraSophie'));
    document.getElementById('botonPulseraMartina').addEventListener('click', () => agregarAlCarrito('pulseraMartina'));
  }

  if (document.getElementById('listaCarrito')) {
    mostrarCarrito();
  }
});