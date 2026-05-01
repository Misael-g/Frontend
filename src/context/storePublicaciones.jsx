import { create } from "zustand"
import axios from "axios"
import { toast } from "react-toastify"

export const CATEGORIAS = [
    "Matemáticas",
    "Física",
    "Programación",
    "Electrónica",
    "Química",
    "Administración",
    "Economía",
    "Humanidades",
    "Inglés",
    "Otros",
]

// lee el token del localStorage donde Zustand
const getAuthHeaders = () => {
    const stored = JSON.parse(localStorage.getItem("auth-unibooks"))
    return {
        headers: {
            Authorization: `Bearer ${stored?.state?.token}`,
        },
    }
}

const storePublicaciones = create((set) => ({

    publicaciones: [],  // listado de todas la publicaciones disponibles
    misPublicaciones: [], // publicaciones del usuario logueado
    publicacionActual: null, // detalle de una publicación específica
    resultadosBusqueda: [], // resultados del buscador
    buscando: false, // loading del buscador

     // /api/publicaciones 
    listarPublicaciones: async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicaciones`
            const { data } = await axios.get(url)
            set({ publicaciones: data.publicaciones || data })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al cargar publicaciones")
        }
    },

    // bsqueda con filtros
    buscarPublicaciones: async ({ titulo, categoria, precioMin, precioMax, estado } = {}) => {
        set({ buscando: true })
        try {
            const params = new URLSearchParams()
            if (titulo?.trim()) params.append("titulo", titulo.trim())
            if (categoria && categoria !== "") params.append("categoria", categoria)
            if (precioMin !== "" && precioMin != null) params.append("precioMin", precioMin)
            if (precioMax !== "" && precioMax != null) params.append("precioMax", precioMax)
            if (estado && estado !== "") params.append("estado", estado)

            const url = `${import.meta.env.VITE_BACKEND_URL}/publicaciones?${params.toString()}`
            const { data } = await axios.get(url)
            set({ resultadosBusqueda: data.publicaciones || data })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al buscar publicaciones")
        } finally {
            set({ buscando: false })
        }
    },

    limpiarBusqueda: () => set({ resultadosBusqueda: [] }),

    // detalle de una publicacion
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

    // Crear una nueva publicacin
    crearPublicacion: async (formData) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicacion`
            const { data } = await axios.post(url, formData, getAuthHeaders())
            toast.success(data.msg)
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al crear publicación")
            return false
        }
    },

    // Editar una publicacin propia
    editarPublicacion: async (id, formData) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicacion/${id}`
            const { data } = await axios.put(url, formData, getAuthHeaders())
            toast.success(data.msg)
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al editar publicación")
            return false
        }
    },
     // Cambiar estado de una publicacin
    cambiarEstado: async (id, estado) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicacion/${id}/estado`
            const auth = getAuthHeaders()
            auth.headers["Content-Type"] = "application/json"
            const { data } = await axios.patch(url, { estado }, auth)
            toast.success(data.msg)
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

    // Eliminar una publicacin propia
    eliminarPublicacion: async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/publicacion/${id}`
            const { data } = await axios.delete(url, getAuthHeaders())
            toast.success(data.msg)
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
     
    // Listar mis propias publicaciones
    cargarMisPublicaciones: async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/mis-publicaciones`
            const { data } = await axios.get(url, getAuthHeaders())
            set({ misPublicaciones: data.publicaciones || data })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al cargar tus publicaciones")
        }
    },

}))

export default storePublicaciones