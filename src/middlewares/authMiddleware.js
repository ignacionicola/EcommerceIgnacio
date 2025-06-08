const jwt = require("../service/jwtService");
// Verifica que el usuario este autenticado (lee el token de la cookie y lo valida).
function authMiddleware(req, res, next) {
  const token = req.cookies["cookie-token"]; //Lee el token de la cookie 
  if (!token) {
    return res.error("Token requerido", 401, "El usuario no posee token");
  }
  try {
    const user = jwt.verificarToken(token); // Verifico que el token sea valido  y agrega los datos de user con el  user
    req.user = user;
    next();
  } catch (error) {
    return res.error("Error en el token", 403,'Token invalido');
  }
}

module.exports = authMiddleware;
