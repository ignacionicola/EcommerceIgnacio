const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const connectDB = require("./src/config/db");
const responseHandler = require("./src/middlewares/responseHandler");
const errorHandler = require("./src/middlewares/errorHandler");
const cookies = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(responseHandler);// Middleware para manejar respuestas
app.use(express.static("public"));// Middleware para servir archivos estáticos desde la carpeta "public"
connectDB();// Conecta a la base de datos MongoDB
app.use(cookies()); // Middleware para manejar cookies


//rutas
const usuarioRouter = require("./src/routes/usuarioRouter");
const authRouter = require("./src/routes/authRoutes");
const productoRouter = require("./src/routes/productoRouter");
app.use("/api/productos", productoRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/usuarios", authRouter);


app.listen(PORT, (req, res) => { //patron event-driven 
  console.log(`Servidor corriendo: http://localhost:${PORT}`);
});
app.use(errorHandler); // Manejador de errores 
module.exports = app; // Exporta la app para poder usarla en los tests

