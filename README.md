# UniBooks — Frontend

Interfaz web de **UniBooks**, un marketplace de libros universitarios de segunda mano. Construida con React, Vite y Tailwind CSS.

---

## Tecnologías

- **React** v18
- **Vite** v6
- **Tailwind CSS** v4
- **Zustand** para manejo de estado global
- **React Router** v7
- **Axios** para peticiones HTTP
- **React Hook Form** para formularios
- **React Toastify** para notificaciones
- **React Icons**

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/)
- El **backend de UniBooks** corriendo (local o en la nube)
---
## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Misael-g/Frontend.git
cd Frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Abre el `.env` y configura la URL del backend:

```env
VITE_BACKEND_URL= url_backend
```

> Si el backend está desplegado en la nube, reemplazá con la URL de producción


### 4. Iniciar la app

```bash
npm run dev
```

La app abre en `http://localhost:5173`.

---

## Estructura del proyecto

```
src/
├── App.jsx               # Rutas principales
├── main.jsx              # Entrada de la app
├── index.css             # Estilos globales
├── components/           # Componentes reutilizables
│   ├── create/
│   │   └── Form.jsx      # Formulario crear publicación
│   ├── list/
│   │   └── Table.jsx     # Tabla de publicaciones
│   └── profile/
│       ├── CardProfile.jsx
│       ├── CardPassword.jsx
│       └── FormProfile.jsx
├── context/              # Estado global con Zustand
│   ├── storeAuth.jsx     # Token y sesión
│   ├── storeProfile.jsx  # Datos del usuario logueado
│   ├── storePublicaciones.jsx
│   └── storeAdmin.jsx
├── hooks/
│   └── useFetch.js       # Hook para peticiones HTTP
├── layout/
│   └── Dashboard.jsx     # Layout del área privada
├── pages/                # Páginas de la app
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Forgot.jsx
│   ├── Reset.jsx
│   ├── Confirm.jsx
│   ├── Panel.jsx
│   ├── Profile.jsx
│   ├── List.jsx
│   ├── Details.jsx
│   ├── Create.jsx
│   ├── Update.jsx
│   ├── MisPublicaciones.jsx
│   ├── Buscador.jsx
│   ├── AdminUsuarios.jsx
│   ├── AdminDetalleUsuario.jsx
│   ├── AdminPublicaciones.jsx
│   ├── Forbidden.jsx
│   └── NotFound.jsx
├── routes/               # Guards de rutas
│   ├── PublicRoute.jsx   # Solo sin sesión
│   ├── ProtectedRoute.jsx # Solo con sesión
│   ├── UserRoute.jsx     # Solo rol usuario
│   └── AdminRoute.jsx    # Solo rol admin
└── utils/
    └── validaciones.js   # Reglas de validación compartidas
```

