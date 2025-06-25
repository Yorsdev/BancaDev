# BancaDev

BancaDev es una API RESTful para la gestión de usuarios y transacciones bancarias, desarrollada con Node.js, Express, TypeScript y PostgreSQL usando TypeORM. Incluye autenticación JWT, envío de correos electrónicos de bienvenida y validaciones robustas.

## Características

- Registro y login de usuarios con validación y hash de contraseñas.
- Gestión de roles de usuario (cliente, admin).
- Transferencias entre usuarios y consulta de historial de transacciones.
- Autenticación basada en JWT y middleware de protección de rutas.
- Envío de correos electrónicos de bienvenida usando Nodemailer y plantillas Pug.
- Arquitectura modular y escalable.

## Estructura del Proyecto

. ├── src/ │ ├── app.ts │ ├── config/ │ ├── data/ │ ├── domain/ │ └── presentation/ │ ├── common/ │ ├── emails/ │ ├── transactions/ │ └── users/ ├── package.json ├── tsconfig.json ├── .env ├── .gitignore └── .prettierrc


## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tuusuario/bancadev.git
   cd bancadev

2. Instala las dependencias:
   ```sh
   npm install

4. Configura las variables de entorno en un archivo .env (ver ejemplo incluido).
   
5. Compila el proyecto:
   ```sh
   npm run build

   
6. Inicia el servidor:
   ```sh
   npm run start:dev


## Endpoints Principales

```sh
POST /api/auth/register — Registro de usuario
POST /api/auth/login — Login de usuario
GET /api/users/me — Perfil del usuario autenticado
POST /api/transactions/ — Crear transferencia (requiere autenticación)
GET /api/transactions/ — Historial de transacciones del usuario
GET /api/transactions/:id — Detalle de una transacción
Variables de Entorno
```

## Ejemplo de archivo .env:
```sh
PORT=3245
NODE_ENV=development

DATABASE_USERNAME=usuario
DATABASE_PASSWORD=contraseña
DATABASE_HOST=host
DATABASE_PORT=5432
DATABASE_NAME=nombre_db

JWT_KEY=clave_secreta
JWT_EXPIRATION=3h

MAILER_SERVICE=gmail
MAILER_EMAIL=tuemail@gmail.com
MAILER_SECRET_KEY=clave_app
SEND_MAIL=true
```

## Scripts
```sh
npm run dev — Desarrollo con recarga automática
npm run build — Compila TypeScript a JavaScript
npm run start:dev — Compila y ejecuta el servidor
Tecnologías
Node.js, Express
TypeScript
PostgreSQL, TypeORM
JWT para autenticación
Nodemailer y Pug para emails
Bcryptjs para hash de contraseñas
Licencia
MIT
```

Desarrollado por [yorsdev]
