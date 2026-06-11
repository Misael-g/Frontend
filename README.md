# UniBooks — Frontend

Interfaz web de **UniBooks**, para libros universitarios de segunda mano. Construida con React, Vite y Tailwind CSS.

El frontend ya está desplegado y accesible en la siguiente URL

https://frontend-black-rho-37.vercel.app/ 

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


