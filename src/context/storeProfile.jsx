import { create } from "zustand"
import axios from "axios"
import { toast } from "react-toastify"

// Lee el token del localStorage donde Zustand lo persistió
const getAuthHeaders = () => {
    const stored = JSON.parse(localStorage.getItem("auth-unibooks"))
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${stored?.state?.token}`,
        },
    }
}

const storeProfile = create((set) => ({

    user: null,

    // Limpiar usuario al cerrar sesión
    clearUser: () => set({ user: null }),

    // GET /api/perfil — cargar datos del usuario autenticado
    profile: async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const respuesta = await axios.get(url, getAuthHeaders())
            set({ user: respuesta.data })
        } catch (error) {
            console.error(error)
        }
    },

    // PUT /api/actualizarperfil/:id — actualizar nombre, email, teléfono, carrera
    updateProfile: async (url, data) => {
        try {
            const respuesta = await axios.put(url, data, getAuthHeaders())
            set({ user: respuesta.data })
            toast.success("Perfil actualizado correctamente")
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg)
        }
    },

    // PUT /api/actualizarpassword — cambiar contraseña (cierra sesión al completar)
    updatePasswordProfile: async (url, data) => {
        try {
            const respuesta = await axios.put(url, data, getAuthHeaders())
            return respuesta
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg)
        }
    },

}))

export default storeProfile