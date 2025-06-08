const form = document.getElementById("form-register");
form.addEventListener("submit", async (e) => { 
  e.preventDefault();
  // Obtener los valores del formulario
  // y enviar una solicitud POST al servidor para registrar un nuevo usuario
  const nombreUsuario = document.querySelector("#nombreUsuario").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const mensaje = document.querySelector("#mensaje");
  try { //
    const res = await fetch("/api/usuarios/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreUsuario, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Error al registrar usuario");
    }


    // Después de login exitoso:
    mensaje.innerHTML = `<p>Usuario registrado exitosamente</p>`;
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (err) {
    mensaje.innerHTML = `<p>ERROR AL REGISTRAR</p>`;
  }
});