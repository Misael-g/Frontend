import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { FaUser, FaTrash, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { MdToggleOn, MdToggleOff } from "react-icons/md"
import storeAdmin from "../context/storeAdmin"


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

    
    const activos    = usuarios.filter(u => u.status).length
    const inactivos  = usuarios.filter(u => !u.status).length

    return (
        <>
            <ToastContainer />

            <div>
                {/* encabezado */}
                <h1 className="font-black text-4xl text-gray-500">Gestión de usuarios</h1>
                <hr className="my-4 border-t-2 border-gray-300" />
                <p className="mb-6 text-gray-500">Administra los usuarios registrados en la plataforma</p>

                {/* Metricas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
                        <div className="bg-gray-100 p-3 rounded-full"><FaUser className="text-gray-600 text-xl" /></div>
                        <div>
                            <p className="text-xs text-gray-500">Total usuarios</p>
                            <p className="text-2xl font-bold text-gray-800">{usuarios.length}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
                        <div className="bg-green-100 p-3 rounded-full"><FaCheckCircle className="text-green-600 text-xl" /></div>
                        <div>
                            <p className="text-xs text-gray-500">Activos</p>
                            <p className="text-2xl font-bold text-green-700">{activos}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
                        <div className="bg-red-100 p-3 rounded-full"><FaTimesCircle className="text-red-600 text-xl" /></div>
                        <div>
                            <p className="text-xs text-gray-500">Inactivos</p>
                            <p className="text-2xl font-bold text-red-600">{inactivos}</p>
                        </div>
                    </div>
                </div>

                {/* tabla */}
                {loadingAdmin && usuarios.length === 0 ? (
                    <div className="flex justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-800 border-t-transparent" />
                    </div>
                ) : usuarios.length === 0 ? (
                    <div className="p-4 text-sm text-gray-500 bg-gray-50 rounded-lg">
                        No hay usuarios registrados.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto shadow-lg bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-800 text-slate-400">
                                <tr>
                                    <th className="p-3 text-left">N°</th>
                                    <th className="p-3 text-left">Nombre</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Teléfono</th>
                                    <th className="p-3 text-left">Carrera</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Confirmado</th>
                                    <th className="p-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((u, index) => (
                                    <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">

                                        <td className="p-3 text-gray-500 text-sm">{index + 1}</td>

                                        {/* nombre */}
                                        <td className="p-3 font-semibold text-gray-800">
                                            {u.nombre}
                                        </td>

                                        {/* email */}
                                        <td className="p-3 text-sm text-gray-600">{u.email}</td>

                                        {/* telefono */}
                                        <td className="p-3 text-sm text-gray-600">{u.telefono}</td>

                                        {/* carrera */}
                                        <td className="p-3 text-sm text-gray-500">{u.carrera ?? "—"}</td>

                                        {/* status — toggle */}
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handleStatus(u)}
                                                disabled={loadingId === u._id}
                                                title={u.status ? "Desactivar usuario" : "Activar usuario"}
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

                                        {/* email confirmado */}
                                        <td className="p-3 text-center">
                                            {u.confirmEmail
                                                ? <FaCheckCircle className="text-green-500 mx-auto text-lg" title="Email confirmado" />
                                                : <FaTimesCircle className="text-gray-300 mx-auto text-lg" title="Sin confirmar" />
                                            }
                                        </td>

                                        {/* acciones */}
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/dashboard/admin/usuario/${u._id}`)}
                                                    className="inline-flex items-center gap-1 text-xs text-white bg-gray-700 hover:bg-gray-900 px-3 py-1.5 rounded-md transition-colors"
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

                        <p className="text-xs text-gray-400 mt-3 text-right">
                            {usuarios.length} usuario{usuarios.length !== 1 ? "s" : ""} registrado{usuarios.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminUsuarios