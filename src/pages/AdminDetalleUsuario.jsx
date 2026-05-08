import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaBook, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { MdToggleOn, MdToggleOff } from "react-icons/md"
import storeAdmin from "../context/storeAdmin"

const AdminDetalleUsuario = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { detalleUsuario, usuarioDetalle, cambiarStatusUsuario, eliminarUsuario } = storeAdmin()
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [loadingEliminar, setLoadingEliminar] = useState(false)

    useEffect(() => {
        detalleUsuario(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if (!usuarioDetalle) {
        return (
            <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-800 border-t-transparent" />
            </div>
        )
    }

    const { usuario, totalPublicaciones } = usuarioDetalle

    const handleStatus = async () => {
        setLoadingStatus(true)
        await cambiarStatusUsuario(usuario._id, !usuario.status)
        await detalleUsuario(id)   // recargar detalle actualizado
        setLoadingStatus(false)
    }

    const handleEliminar = async () => {
        if (!window.confirm(`¿Eliminar al usuario "${usuario.nombre}" y TODAS sus publicaciones? Esta acción es irreversible.`)) return
        setLoadingEliminar(true)
        const ok = await eliminarUsuario(usuario._id)
        setLoadingEliminar(false)
        if (ok) navigate("/dashboard/admin/usuarios")
    }

    return (
        <>
            <ToastContainer />

            <div>
                {/* encabezado */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="font-black text-4xl text-gray-500">Detalle de usuario</h1>
                        <hr className="my-3 border-t-2 border-gray-300" />
                        <p className="text-gray-500">Información completa del usuario</p>
                    </div>
                    <button
                        onClick={() => navigate("/dashboard/admin/usuarios")}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                        <FaArrowLeft /> Volver
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">

                    {/* trjeta del usuario */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">

                            {/* nombre */}
                            <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-100">
                                <div className="bg-gray-200 rounded-full h-20 w-20 flex items-center justify-center">
                                    <FaUser className="text-gray-500 text-4xl" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">{usuario.nombre}</h2>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    usuario.status
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}>
                                    {usuario.status ? "Activo" : "Inactivo"}
                                </span>
                            </div>

                            {/* datos */}
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaEnvelope className="text-gray-400 shrink-0" />
                                    <span className="break-all">{usuario.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaPhone className="text-gray-400 shrink-0" />
                                    <span>{usuario.telefono}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaBook className="text-gray-400 shrink-0" />
                                    <span>{usuario.carrera ?? "Sin carrera"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    {usuario.confirmEmail
                                        ? <FaCheckCircle className="text-green-500 shrink-0" />
                                        : <FaTimesCircle className="text-red-400 shrink-0" />
                                    }
                                    <span>{usuario.confirmEmail ? "Email confirmado" : "Email sin confirmar"}</span>
                                </div>
                            </div>

                            {/* mtrica publicaciones */}
                            <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Publicaciones totales</p>
                                <p className="text-3xl font-black text-gray-800 mt-1">{totalPublicaciones}</p>
                            </div>

                            {/* acciones admin */}
                            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">

                                {/* aambiar status */}
                                <button
                                    onClick={handleStatus}
                                    disabled={loadingStatus}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60 ${
                                        usuario.status
                                            ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                            : "bg-green-100 text-green-700 hover:bg-green-200"
                                    }`}
                                >
                                    {usuario.status
                                        ? <><MdToggleOff className="text-lg" /> Desactivar usuario</>
                                        : <><MdToggleOn className="text-lg" /> Activar usuario</>
                                    }
                                </button>

                                {/* eliminar */}
                                <button
                                    onClick={handleEliminar}
                                    disabled={loadingEliminar}
                                    className="flex items-center justify-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-900 transition-colors disabled:opacity-60"
                                >
                                    <FaTrash />
                                    {loadingEliminar ? "Eliminando..." : "Eliminar usuario"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* info adicional */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="font-bold text-gray-700 mb-4 text-lg">Resumen de actividad</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total publicaciones</p>
                                    <p className="text-4xl font-black text-gray-800">{totalPublicaciones}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Rol</p>
                                    <p className="text-2xl font-black text-gray-800 capitalize">{usuario.rol}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Estado cuenta</p>
                                    <p className={`text-lg font-bold ${usuario.status ? "text-green-600" : "text-red-600"}`}>
                                        {usuario.status ? "Activa" : "Inactiva"}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email verificado</p>
                                    <p className={`text-lg font-bold ${usuario.confirmEmail ? "text-green-600" : "text-orange-500"}`}>
                                        {usuario.confirmEmail ? "Sí" : "No"}
                                    </p>
                                </div>
                            </div>

                            {/* fechas */}
                            <div className="mt-5 pt-4 border-t border-gray-100 text-sm text-gray-500 space-y-1">
                                <p>
                                    <span className="font-semibold text-gray-600">Registrado:</span>{" "}
                                    {new Date(usuario.createdAt).toLocaleDateString("es-EC", {
                                        day: "2-digit", month: "long", year: "numeric"
                                    })}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-600">Última actualización:</span>{" "}
                                    {new Date(usuario.updatedAt).toLocaleDateString("es-EC", {
                                        day: "2-digit", month: "long", year: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDetalleUsuario