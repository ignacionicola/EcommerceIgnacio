# EcommerceIgnacio

 Proyecto Ecommerce con un sistema de autenticación, gestión de usuarios y productos, y panel de administración.

 Utilize
 - Node.js
 - Express
 - Express-validator
 - MongoDB (Mongoose)
 - JWT (Jsonwebtoken)
 - Cookie-parser
 - Jest y Supertest 

 # Infraestrucura del proyecto 
├── app.js
├── .env
├── package.json
├── public/
│   ├── index.html
│   ├── register.html
│   ├── productos.html
│   ├── admin.html
│   ├── css/
│   └── js/
└── src/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── service/
    └── tests
    
## Configuracion
1. Clona el repositorio.
2. Instala las dependencias con npm install
3. Configurar el ".env"
4. Incia el server con npm run dev ( el server corre en puerto 3000)


##  Endpoints Principales

### Autenticación

- `POST /api/usuarios/login`  
  Inicia sesión, devuelve un token JWT en una cookie.


  ### Usuarios

- `POST /api/usuarios/register`  
  Registra un nuevo usuario.
- `GET /api/usuarios/`  
  Lista todos los usuarios (requiere rol admin).
- `DELETE /api/usuarios/:nombreUsuario`  
  Elimina un usuario (requiere rol admin).
- `PUT /api/usuarios/:nombreUsuario`  
  Actualiza un usuario.

  ### Productos

- `GET /api/productos`  
  Lista todos los productos (requiere autenticación).
- `POST /api/productos`  
  Crea un producto (requiere rol admin).
- `DELETE /api/productos/:nombre`  
  Elimina un producto (requiere rol admin).


  # Como funciona?

  - **Autenticacion** 
  El login genera un JWT que se guarda en una cookie. El middleware [`authMiddleware`](src/middlewares/authMiddleware.js) verifica que el usuraio este autenticado para acceder a una ruta que tenga autenticacion.
       **Roles:**  
  El middleware [`rolesMiddleware`](src/middlewares/rolesMiddleware.js) permite acceso solo a usuarios con rol `admin` a las rutas protegidas.
-    **Validaciones:**  
  Se usa `express-validator` para validar datos de entrada en los controladores.
-    **Respuestas:**  
  El middleware [`responseHandler`](src/middlewares/responseHandler.js) estandariza las respuestas de la API para que sea una forma mas buena de leer y que los otros programadores entiendan
-    **Errores:**  
  El middleware [`errorHandler`](src/middlewares/errorHandler.js) captura y responde a errores de forma centralizada.

    ## Frontend

- El frontend está en la carpeta `public/` y consume la API usando fetch para solicitar a mi api los endpoints
- Hay páginas para login, registro, productos y administración.

    ## Testing

- Los tests están en `src/tests/` y usan Jest + Supertest.
- Ejecuta los tests con npm test


##  Alumno:  Ignacio Nicola
##  Materia: Programacion 2
##  Carrera: Desarrollo Web