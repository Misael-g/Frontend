import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { FaUser, FaTrash, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { MdToggleOn, MdToggleOff } from "react-icons/md"
import storeAdmin from "../context/storeAdmin"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

const AdminUsuarios = () => {
    const navigate = useNavigate()
    const { usuarios, listarUsuarios, cambiarStatusUsuario, eliminarUsuario, loadingAdmin } = storeAdmin()
    const [loadingId, setLoadingId] = useState(null)

    useEffect(() => {
        listarUsuarios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleStatus = async (usuario) => {
        setLoadingId(usuario._id)
        await cambiarStatusUsuario(usuario._id, !usuario.status)
        setLoadingId(null)
    }

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Eliminar este usuario y TODAS sus publicaciones? Esta acción es irreversible.")) return
        setLoadingId(id)
        await eliminarUsuario(id)
        setLoadingId(null)
    }

    const activos   = usuarios.filter(u => u.status).length
    const inactivos = usuarios.filter(u => !u.status).length

    return (
        <>
            <ToastContainer />

            <div>
                {/* encabezado */}
                <h1 className="font-black text-2xl" style={{color: C.primary}}>Gestión de usuarios</h1>
                <hr className="my-3" style={{borderColor: C.border}} />
                <p className="mb-6 text-sm" style={{color: C.muted}}>Administra los usuarios registrados en la plataforma</p>

                {/* Métricas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { label:'Total usuarios', value: usuarios.length, icon: <FaUser style={{color: C.primary, fontSize:18}} />, ibg:'rgba(26,58,92,0.1)', vc: C.primary },
                        { label:'Activos',        value: activos,         icon: <FaCheckCircle className="text-green-600" style={{fontSize:18}} />, ibg:'#dcfce7', vc:'#16a34a' },
                        { label:'Inactivos',      value: inactivos,       icon: <FaTimesCircle className="text-red-500" style={{fontSize:18}} />,   ibg:'#fee2e2', vc:'#dc2626' },
                    ].map(({label, value, icon, ibg, vc}) => (
                        <div key={label} className="rounded-xl p-5 flex items-center gap-4 shadow-sm"
                            style={{background:'#fff', border:`1px solid ${C.border}`}}>
                            <div className="p-3 rounded-full flex-shrink-0" style={{background: ibg}}>{icon}</div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide" style={{color: C.muted}}>{label}</p>
                                <p className="text-3xl font-bold mt-0.5" style={{color: vc}}>{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* tabla */}
                {loadingAdmin && usuarios.length === 0 ? (
                    <div className="flex justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent"
                            style={{borderColor:`${C.primary} ${C.border} ${C.border}`}} />
                    </div>
                ) : usuarios.length === 0 ? (
                    <div className="p-4 text-sm rounded-lg" style={{background: C.bg, color: C.muted}}>
                        No hay usuarios registrados.
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl shadow-sm" style={{border:`1px solid ${C.border}`}}>
                        <table className="w-full table-auto bg-white rounded-xl overflow-hidden">
                            <thead>
                                <tr style={{background: C.primary}}>
                                    {['N°','Nombre','Email','Teléfono','Carrera','Status','Confirmado','Acciones'].map(h => (
                                        <th key={h} className="p-3 text-left text-xs font-semibold uppercase tracking-wide text-white">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((u, index) => (
                                    <tr key={u._id} className="border-b transition-colors hover:bg-blue-50/30"
                                        style={{borderColor: C.border}}>

                                        <td className="p-3 text-sm" style={{color: C.muted}}>{index + 1}</td>

                                        <td className="p-3 font-semibold text-sm" style={{color: C.primary}}>
                                            {u.nombre}
                                        </td>

                                        <td className="p-3 text-sm" style={{color: C.muted}}>{u.email}</td>

                                        <td className="p-3 text-sm" style={{color: C.muted}}>{u.telefono}</td>

                                        <td className="p-3 text-sm" style={{color:'#94a3b8'}}>{u.carrera ?? "—"}</td>

                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handleStatus(u)}
                                                disabled={loadingId === u._id}
                                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors disabled:opacity-50 ${
                                                    u.status
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                                }`}
                                            >
                                                {u.status
                                                    ? <><MdToggleOn className="text-base" /> Activo</>
                                                    : <><MdToggleOff className="text-base" /> Inactivo</>
                                                }
                                            </button>
                                        </td>

                                        <td className="p-3 text-center">
                                            {u.confirmEmail
                                                ? <FaCheckCircle className="text-green-500 mx-auto text-lg" title="Email confirmado" />
                                                : <FaTimesCircle className="mx-auto text-lg" style={{color: C.border}} title="Sin confirmar" />
                                            }
                                        </td>

                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/dashboard/admin/usuario/${u._id}`)}
                                                    className="inline-flex items-center gap-1 text-xs text-white px-3 py-1.5 rounded-md transition-colors"
                                                    style={{background: C.primary}}
                                                    onMouseOver={e => e.currentTarget.style.background='#0f2540'}
                                                    onMouseOut={e => e.currentTarget.style.background=C.primary}
                                                >
                                                    <FaEye /> Ver
                                                </button>
                                                <button
                                                    onClick={() => handleEliminar(u._id)}
                                                    disabled={loadingId === u._id}
                                                    className="inline-flex items-center gap-1 text-xs text-white bg-red-700 hover:bg-red-900 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                                >
                                                    <FaTrash />
                                                    {loadingId === u._id ? "..." : "Eliminar"}
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <p className="text-xs px-4 py-2 text-right" style={{color:'#94a3b8'}}>
                            {usuarios.length} usuario{usuarios.length !== 1 ? "s" : ""} registrado{usuarios.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminUsuarios