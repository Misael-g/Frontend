import { Navigate, Outlet } from "react-router"
import storeProfile from "../context/storeProfile"

// oroteger rutas que solo puede ver el admin si el usuario no es admin lo redirige a dashboard
// fi el usuario es adminrenderiza a los hijos 
const AdminRoute = () => {
    const { user } = storeProfile()

    // no rendirizar si no hay rol 
    if (!user) return null

    return user.rol === "admin"
        ? <Outlet />
        : <Navigate to="/dashboard" replace />
}

export default AdminRoute