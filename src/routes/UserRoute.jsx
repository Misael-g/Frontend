import { Navigate, Outlet } from "react-router"
import storeProfile from "../context/storeProfile"

// Proteger las  rutas que solo  puede ver el usuario normal 
const UserRoute = () => {
    const { user } = storeProfile()

    if (!user) return null   // espera a que cargue el perfil

    return user.rol !== "admin"
        ? <Outlet />
        : <Navigate to="/dashboard" replace />
}

export default UserRoute