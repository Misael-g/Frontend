import { create } from "zustand"
import { persist } from "zustand/middleware"

// Store global con persistencia en localStorage
// Guarda el token y los datos basicos del usuario al iniciar sesin
const storeAuth = create(
    persist(
        (set) => ({
            token: null,
            rol: null,
            usuario: null,
            setToken:   (token)   => set({ token }),
            setRol:     (rol)     => set({ rol }),
            setUsuario: (usuario) => set({ usuario }),
            clearToken: ()        => set({ token: null, rol: null, usuario: null }),
        }),
        { name: "auth-unibooks" }
    )
)

export default storeAuth