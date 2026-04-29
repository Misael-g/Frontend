import { create } from "zustand"
import axios from "axios"
import { toast } from "react-toastify"


// lee el token del localStorage donde Zustand
const getAuthHeaders = () => {
    const stored = JSON.parse(localStorage.getItem("auth-unibooks"))
    return {
        headers: {
            Authorization: `Bearer ${stored?.state?.token}`,
        },
    }
}

const storePublicaciones = create((set, get) => ({

    publicaciones: [],       // listado  disponibles
    misPublicaciones: [],    // publicaciones del usuario 
    publicacionActual: null, // detalle de una publicacin


    
    // api/publicaciones  

    listarPublicaciones: async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicaciones`
            const { data } = await axios.get(url)
            set({ publicaciones: data })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al cargar publicaciones")
        }
    },


    // api/publicacion/:id  

    detallePublicacion: async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicacion/${id}`
            const { data } = await axios.get(url)
            set({ publicacionActual: data })
            return data
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Publicación no encontrada")
            return null
        }
    },



    //  api/publicacion  privada -  token

    crearPublicacion: async (formData) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicacion`
            const headers = getAuthHeaders()
            // Para FormData NO se pone Content-Type (el navegador lo agrega con el boundary)
            const { data } = await axios.post(url, formData, headers)
            toast.success(data.msg)
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al crear publicación")
            return false
        }
    },


    // api/publicacion/:id  privada

    editarPublicacion: async (id, formData) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicacion/${id}`
            const headers = getAuthHeaders()
            const { data } = await axios.put(url, formData, headers)
            toast.success(data.msg)
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al editar publicación")
            return false
        }
    },

    // estado disponible  vendido

    cambiarEstado: async (id, estado) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicacion/${id}/estado`
            const headers = getAuthHeaders()
            // Para JSON sí agregamos Content-Type
            headers.headers["Content-Type"] = "application/json"
            const { data } = await axios.patch(url, { estado }, headers)
            toast.success(data.msg)
            // Actualizar en la lista local de mis publicaciones
            set((state) => ({
                misPublicaciones: state.misPublicaciones.map((p) =>
                    p._id === id ? { ...p, estado } : p
                ),
            }))
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al cambiar estado")
            return false
        }
    },


    // api/publicacion/:id  privada

    eliminarPublicacion: async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicacion/${id}`
            const headers = getAuthHeaders()
            const { data } = await axios.delete(url, headers)
            toast.success(data.msg)
            // Quitar de la lista local
            set((state) => ({
                misPublicaciones: state.misPublicaciones.filter((p) => p._id !== id),
            }))
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al eliminar publicación")
            return false
        }
    },

    // api/mis-publicaciones  privada

    cargarMisPublicaciones: async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/mis-publicaciones`
            const headers = getAuthHeaders()
            const { data } = await axios.get(url, headers)
            set({ misPublicaciones: data })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al cargar tus publicaciones")
        }
    },

}))

export default storePublicaciones