import { create } from "zustand"
import axios from "axios"
import { toast } from "react-toastify"

const getAdminHeaders = () => {
    const stored = JSON.parse(localStorage.getItem("auth-unibooks"))
    return {
        headers: {
            Authorization: `Bearer ${stored?.state?.token}`,
            "Content-Type": "application/json",
        },
    }
}

const storeAdmin = create((set) => ({

    //  Estado 
    usuarios:            [],
    usuarioDetalle:      null,   
    publicacionesAdmin:  [],
    loadingAdmin:        false,


    //  total usuarios 

    listarUsuarios: async () => {
        set({ loadingAdmin: true })
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/usuarios`
            const { data } = await axios.get(url, getAdminHeaders())
            set({ usuarios: data.usuarios ?? [] })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al cargar usuarios")
        } finally {
            set({ loadingAdmin: false })
        }
    },


    //  detalle del Usuario

    detalleUsuario: async (id) => {
        set({ loadingAdmin: true, usuarioDetalle: null })
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/usuario/${id}`
            const { data } = await axios.get(url, getAdminHeaders())
            set({ usuarioDetalle: data })     
            return data
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Usuario no encontrado")
            return null
        } finally {
            set({ loadingAdmin: false })
        }
    },


    //  cambiaar activar o desactivar usuario

    cambiarStatusUsuario: async (id, status) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/usuario/${id}/status`
            const { data } = await axios.patch(url, { status }, getAdminHeaders())
            toast.success(data.msg)
            set((state) => ({
                usuarios: state.usuarios.map((u) =>
                    u._id === id ? { ...u, status } : u
                ),
                usuarioDetalle: state.usuarioDetalle?.usuario?._id === id
                    ? { ...state.usuarioDetalle, usuario: { ...state.usuarioDetalle.usuario, status } }
                    : state.usuarioDetalle,
            }))
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al cambiar status")
            return false
        }
    },


    // eliminar el Usuario

    eliminarUsuario: async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/usuario/${id}`
            const { data } = await axios.delete(url, getAdminHeaders())
            toast.success(data.msg)
            set((state) => ({
                usuarios: state.usuarios.filter((u) => u._id !== id),
            }))
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al eliminar usuario")
            return false
        }
    },


    // el Total publicaciones

    listarTodasPublicaciones: async ({ titulo, categoria, estado, usuario } = {}) => {
        set({ loadingAdmin: true })
        try {
            const params = new URLSearchParams()
            if (titulo?.trim())               params.append("titulo",    titulo.trim())
            if (categoria && categoria !== "") params.append("categoria", categoria)
            if (estado && estado !== "")      params.append("estado",    estado)
            if (usuario && usuario !== "")    params.append("usuario",   usuario)

            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/publicaciones?${params.toString()}`
            const { data } = await axios.get(url, getAdminHeaders())
            set({ publicacionesAdmin: data.publicaciones ?? [] })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al cargar publicaciones")
        } finally {
            set({ loadingAdmin: false })
        }
    },

   // eliminar Publicacion solo Admin


    eliminarPublicacionAdmin: async (id) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/publicacion/${id}`
            const { data } = await axios.delete(url, getAdminHeaders())
            toast.success(data.msg)
            set((state) => ({
                publicacionesAdmin: state.publicacionesAdmin.filter((p) => p._id !== id),
            }))
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al eliminar publicación")
            return false
        }
    },

}))


export default storeAdmin