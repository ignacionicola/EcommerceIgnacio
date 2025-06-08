const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    precio: { type: Number },
    stock: { type: Number, default: 0 },
  },
  { collection: "productos" }
);



const producto = mongoose.model("Producto", productSchema); // Define el modelo Producto basado en el esquema productSchema
module.exports = producto;
