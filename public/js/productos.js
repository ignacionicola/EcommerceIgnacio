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
    let nombre, stock, precio, boton;
    productos.data.forEach((producto) => {
      let nuevoProducto = document.createElement("tr");
      nuevoProducto.id = contador;
      nombre = document.createElement("td");
      nombre.id = contador;
      contador++;
      stock = document.createElement("td");
      precio = document.createElement("td");
      nombre.textContent = producto.nombre;
      precio.textContent = producto.precio;
      stock.textContent = producto.stock;
      nuevoProducto.appendChild(nombre);
      nuevoProducto.appendChild(precio);
      nuevoProducto.appendChild(stock);
      boton = document.createElement("button");
      boton.textContent = "Agregar al carrito";
      boton.addEventListener("click", botonAgregarCarrito);
      nuevoProducto.appendChild(boton);
      tabla.appendChild(nuevoProducto);
    });
  } catch (err) {
    console.log(err);
  }
  verCarrito();
}

//Funcion para agregar elementos al carrito con localStorage
function botonAgregarCarrito(event) {
  const nombreProducto = event.target.parentElement.children[0].textContent;
  const producto = {
    nombre: nombreProducto,
    precio: event.target.parentElement.children[1].textContent,
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

// ----------- 🌙 CAMBIO DE TEMA (con ícono y localStorage) -----------
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