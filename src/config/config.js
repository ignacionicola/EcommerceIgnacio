require("dotenv").config(); // Carga las variables de entorno desde el archivo .env
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
