const main = document.querySelector("#productos");
let contador = 1;

// Obtener usuario actual
const usuarioActual = localStorage.getItem("usuarioActual") || "anonimo";

// Cargar carrito del usuario actual
let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual}`)) || [];

async function mostrarProductos() {
  try {
    const res = await fetch("/api/productos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const productos = await res.json();

    const tabla = document.querySelector("table");
    // Limpia todas las filas menos el encabezado
    const filas = tabla.querySelectorAll("tr:not(:first-child)");
    filas.forEach(fila => fila.remove());

    productos.data.forEach((producto) => {
      const fila = document.createElement("tr");

      const tdNombre = document.createElement("td");
      tdNombre.textContent = producto.nombre;

      const tdPrecio = document.createElement("td");
      tdPrecio.textContent = producto.precio;

      const tdStock = document.createElement("td");
      tdStock.textContent = producto.stock;

      const tdBoton = document.createElement("td");
      const boton = document.createElement("button");
      boton.textContent = "Agregar al carrito";
      boton.addEventListener("click", botonAgregarCarrito);
      tdBoton.appendChild(boton);

      fila.appendChild(tdNombre);
      fila.appendChild(tdPrecio);
      fila.appendChild(tdStock);
      fila.appendChild(tdBoton);

      tabla.appendChild(fila);
    });
  } catch (err) {
    console.log(err);
  }
  verCarrito();
}

//Funcion para agregar elementos al carrito con localStorage
function botonAgregarCarrito(event) {
  const fila = event.target.closest("tr");
  const nombreProducto = fila.children[0].textContent;
  const precioProducto = fila.children[1].textContent;
  const producto = {
    nombre: nombreProducto,
    precio: precioProducto,
  };
  carrito.push(producto);
  localStorage.setItem(`carrito_${usuarioActual}`, JSON.stringify(carrito));
  verCarrito();
}

// Al mostrar el carrito:
function verCarrito() {
  const usuarioActual = localStorage.getItem("usuarioActual") || "anonimo";
  const carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioActual}`)) || [];
  const carritoList = document.querySelector("#carrito-list");
  carritoList.innerHTML = "";
  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} $${producto.precio}`;
    carritoList.appendChild(li);
  });
}

// -----------  CAMBIO DE TEMA (con ícono y localStorage) -----------
function aplicarTema(tema) {
  const body = document.body;
  const btnTema = document.getElementById("tema-btn");

  if (tema === "claro") {
    body.classList.add("tema-claro");
    btnTema.textContent = "🌞";
  } else {
    body.classList.remove("tema-claro");
    btnTema.textContent = "🌙";
  }
}

function configurarCambioTema() {
  const btnTema = document.getElementById("tema-btn");
  const usuarioActual = localStorage.getItem("usuarioActual") || "anonimo";
  const temaGuardado = localStorage.getItem(`tema_${usuarioActual}`) || "oscuro";
  aplicarTema(temaGuardado);

  btnTema.addEventListener("click", () => {
    const nuevoTema = document.body.classList.contains("tema-claro") ? "oscuro" : "claro";
    localStorage.setItem(`tema_${usuarioActual}`, nuevoTema);
    aplicarTema(nuevoTema);
  });
}



// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  configurarCambioTema();
});