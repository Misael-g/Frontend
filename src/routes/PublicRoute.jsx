import { Navigate, Outlet } from "react-router"
import storeAuth from "../context/storeAuth"

// Si hay token (ya inició sesión) → redirige al dashboard
// Si no hay token → muestra la ruta pública normalmente
const PublicRoute = () => {
    const token = storeAuth((state) => state.token)
    return token ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default PublicRoute