const crypto = require("crypto");
function hashPassword(password, salt) { //
  //Crea el hash de la contraseña
  //Recibe la contraseña y la "sal" (salt) como parámetros
  //Utiliza el algoritmo sha256
  //Devuelve el resultado en hexadecimal
  const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");
  return hash;
}

module.exports= {hashPassword};
// un ejemplo aca estoy usando el patron Modulo