import { Navigate } from "react-router"
import storeAuth from "../context/storeAuth"

// Si hay token → muestra la página protegida
// Si no hay token → redirige al login
const ProtectedRoute = ({ children }) => {
    const token = storeAuth((state) => state.token)
    return token ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute