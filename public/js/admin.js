 
 // Agregar un producto
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("product-name").value.trim();
  const precio = document.getElementById("product-price").value;
  const stock = document.getElementById("product-stock").value;
  const message = document.getElementById("message");
  try {
    const res = await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nombre, precio, stock }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al crear producto");
    message.innerHTML = `<p>Producto creado correctamente</p>`;
  } catch (err) {
    message.innerHTML = `<p>${err.message}</p>`;
  }
});

// Listar productos
document.getElementById("get-product-list").addEventListener("click", async () => {
  const productsUl = document.getElementById("products");
  productsUl.innerHTML = "";
  try {
    const res = await fetch("/api/productos", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al obtener productos");
    data.data.forEach((prod) => {
      const li = document.createElement("li");
      li.textContent = `${prod.nombre} - $${prod.precio} - Stock: ${prod.stock}`;
      productsUl.appendChild(li);
    });
  } catch (err) {
    productsUl.innerHTML = `<li>${err.message}</li>`;
  }
});

// Eliminar un producto
document.getElementById("delete-product-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("delete-product-id").value.trim();
  const message = document.getElementById("message");
  try {
    const res = await fetch(`/api/productos/${nombre}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al eliminar producto");
    message.innerHTML = `<p>Producto eliminado correctamente</p>`;
  } catch (err) {
    message.innerHTML = `<p>${err.message}</p>`;
  }
});

// Eliminar un usuario
document.getElementById("delete-user-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombreUsuario = document.getElementById("user-id").value.trim();
  const message = document.getElementById("message");
  try {
    const res = await fetch(`/api/usuarios/${nombreUsuario}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al eliminar usuario");
    message.innerHTML = `<p>Usuario eliminado correctamente</p>`;
  } catch (err) {
    message.innerHTML = `<p>${err.message}</p>`;
  }
});

// Listar usuarios
document.getElementById("get-users").addEventListener("click", async () => {
  const usersUl = document.getElementById("users");
  usersUl.innerHTML = "";
  try {
    const res = await fetch("/api/usuarios", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al obtener usuarios");
    data.data.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.nombreUsuario} - ${user.email} - ${user.rol}`;
      usersUl.appendChild(li);
    });
  } catch (err) {
    usersUl.innerHTML = `<li>${err.message}</li>`;
  }
});

// Ir a productos
document.getElementById("index").addEventListener("click", () => {
  window.location.href = "productos.html";
});