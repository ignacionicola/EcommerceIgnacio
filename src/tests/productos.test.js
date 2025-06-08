const request = require("supertest");
const app = require("../../app"); 


//acceder a una ruta protegida de la API de Productos
// Tests para la API de Productos
describe("API de Productos", () => {
  test("GET /api/productos", async () => {
    const res = await request(app).get("/api/productos");

    // Se espera un error 401 si no se envía el token de autenticación
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error"); // Opcional: verificar el mensaje
  });
});