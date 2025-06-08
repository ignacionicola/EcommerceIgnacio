const request = require("supertest");
const app = require("../../app");


describe("Registro de usuario", () => {
  test("POST /api/usuarios/register", async () => {
    const res = await request(app)
      .post("/api/usuarios/register")
      .send({
        nombreUsuario: "testuser",
        email: "testuser@example.com",
        password: "12345678"
      });

    // Log para depuración
   // console.log("Status:", res.statusCode);
   // console.log("Body:", res.body);

    expect(res.statusCode).toBe(200); // Si tu API devuelve otro código, ajustalo aquí
    expect(res.body.success).toBe(true); // Verificá si existe .success en la respuesta
  });
});