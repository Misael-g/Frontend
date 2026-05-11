import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaBook, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { MdToggleOn, MdToggleOff } from "react-icons/md"
import storeAdmin from "../context/storeAdmin"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

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
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent"
                    style={{borderColor:`${C.primary} ${C.border} ${C.border}`}} />
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
                        <h1 className="font-black text-2xl" style={{color: C.primary}}>Detalle de usuario</h1>
                        <hr className="my-3" style={{borderColor: C.border}} />
                        <p className="text-sm" style={{color: C.muted}}>Información completa del usuario</p>
                    </div>
                    <button
                        onClick={() => navigate("/dashboard/admin/usuarios")}
                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors"
                        style={{border:`1px solid ${C.border}`, color: C.muted}}
                        onMouseOver={e => e.currentTarget.style.background=C.bg}
                        onMouseOut={e => e.currentTarget.style.background='transparent'}
                    >
                        <FaArrowLeft /> Volver
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">

                    {/* trjeta del usuario */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl p-6 flex flex-col gap-4 shadow-sm"
                            style={{background:'#fff', border:`1px solid ${C.border}`}}>

                            {/* nombre */}
                            <div className="flex flex-col items-center gap-2 pb-4"
                                style={{borderBottom:`1px solid ${C.border}`}}>
                                <div className="rounded-full h-20 w-20 flex items-center justify-center"
                                    style={{background:'rgba(26,58,92,0.08)', border:`2px solid ${C.accent}`}}>
                                    <FaUser className="text-4xl" style={{color: C.primary}} />
                                </div>
                                <h2 className="text-lg font-bold" style={{color: C.primary}}>{usuario.nombre}</h2>
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
                                <div className="flex items-center gap-2" style={{color: C.muted}}>
                                    <FaEnvelope style={{color: C.accent, flexShrink:0}} />
                                    <span className="break-all">{usuario.email}</span>
                                </div>
                                <div className="flex items-center gap-2" style={{color: C.muted}}>
                                    <FaPhone style={{color: C.accent, flexShrink:0}} />
                                    <span>{usuario.telefono}</span>
                                </div>
                                <div className="flex items-center gap-2" style={{color: C.muted}}>
                                    <FaBook style={{color: C.accent, flexShrink:0}} />
                                    <span>{usuario.carrera ?? "Sin carrera"}</span>
                                </div>
                                <div className="flex items-center gap-2" style={{color: C.muted}}>
                                    {usuario.confirmEmail
                                        ? <FaCheckCircle className="flex-shrink-0" style={{color:'#16a34a'}} />
                                        : <FaTimesCircle className="flex-shrink-0" style={{color:'#dc2626'}} />
                                    }
                                    <span>{usuario.confirmEmail ? "Email confirmado" : "Email sin confirmar"}</span>
                                </div>
                            </div>

                            {/* mtrica publicaciones */}
                            <div className="rounded-lg p-3 text-center"
                                style={{background: C.bg, border:`1px solid ${C.border}`}}>
                                <p className="text-xs uppercase tracking-wide font-medium" style={{color: C.muted}}>
                                    Publicaciones totales
                                </p>
                                <p className="text-3xl font-black mt-1" style={{color: C.primary}}>{totalPublicaciones}</p>
                            </div>

                            {/* acciones admin */}
                            <div className="flex flex-col gap-2 pt-2" style={{borderTop:`1px solid ${C.border}`}}>

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
                        <div className="rounded-xl p-6 shadow-sm"
                            style={{background:'#fff', border:`1px solid ${C.border}`}}>
                            <h3 className="font-bold mb-4 text-lg" style={{color: C.primary}}>Resumen de actividad</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg p-4 text-center" style={{background: C.bg, border:`1px solid ${C.border}`}}>
                                    <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{color: C.muted}}>Total publicaciones</p>
                                    <p className="text-4xl font-black" style={{color: C.primary}}>{totalPublicaciones}</p>
                                </div>
                                <div className="rounded-lg p-4 text-center" style={{background: C.bg, border:`1px solid ${C.border}`}}>
                                    <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{color: C.muted}}>Rol</p>
                                    <p className="text-2xl font-black capitalize" style={{color: C.primary}}>{usuario.rol}</p>
                                </div>
                                <div className="rounded-lg p-4 text-center" style={{background: C.bg, border:`1px solid ${C.border}`}}>
                                    <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{color: C.muted}}>Estado cuenta</p>
                                    <p className="text-lg font-bold" style={{color: usuario.status ? '#16a34a' : '#dc2626'}}>
                                        {usuario.status ? "Activa" : "Inactiva"}
                                    </p>
                                </div>
                                <div className="rounded-lg p-4 text-center" style={{background: C.bg, border:`1px solid ${C.border}`}}>
                                    <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{color: C.muted}}>Email verificado</p>
                                    <p className="text-lg font-bold" style={{color: usuario.confirmEmail ? '#16a34a' : '#f59e0b'}}>
                                        {usuario.confirmEmail ? "Sí" : "No"}
                                    </p>
                                </div>
                            </div>

                            {/* fechas */}
                            <div className="mt-5 pt-4 text-sm space-y-1" style={{borderTop:`1px solid ${C.border}`}}>
                                <p style={{color: C.muted}}>
                                    <span className="font-semibold" style={{color:'#334155'}}>Registrado:</span>{" "}
                                    {new Date(usuario.createdAt).toLocaleDateString("es-EC", {
                                        day: "2-digit", month: "long", year: "numeric"
                                    })}
                                </p>
                                <p style={{color: C.muted}}>
                                    <span className="font-semibold" style={{color:'#334155'}}>Última actualización:</span>{" "}
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