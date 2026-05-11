import { useEffect } from "react"
import { Link } from "react-router"
import { FaBook, FaCheckCircle, FaTimesCircle, FaPlus, FaUsers, FaShieldAlt } from "react-icons/fa"
import PropTypes from "prop-types"
import { MdBarChart, MdManageAccounts, MdMenuBook } from "react-icons/md"
import storePublicaciones from "../context/storePublicaciones"
import storeAdmin from "../context/storeAdmin"
import storeProfile from "../context/storeProfile"


const PanelAdmin = ({ user }) => {
    const { usuarios, publicacionesAdmin, listarUsuarios, listarTodasPublicaciones } = storeAdmin()

    useEffect(() => {
        listarUsuarios()
        listarTodasPublicaciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const activos      = usuarios.filter(u => u.status).length
    const inactivos    = usuarios.filter(u => !u.status).length
    const disponibles  = publicacionesAdmin.filter(p => p.estado === "disponible").length
    const vendidos     = publicacionesAdmin.filter(p => p.estado === "vendido").length

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <FaShieldAlt className="text-red-600 text-2xl" />
                    <h1 className="font-black text-2xl text-gray-600">
                        Panel de administración — {user?.nombre}
                    </h1>
                </div>
                <p className="text-gray-400 text-sm mt-1 ml-9">
                    Resumen general de la plataforma
                </p>
                <hr className="my-4 border-t-2 border-gray-300" />
            </div>

            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
                <FaUsers /> Usuarios registrados
            </p>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                        <FaUsers className="text-gray-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total usuarios</p>
                        <p className="text-3xl font-bold text-gray-800">{usuarios.length}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaCheckCircle className="text-green-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Activos</p>
                        <p className="text-3xl font-bold text-green-700">{activos}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <FaTimesCircle className="text-red-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Inactivos</p>
                        <p className="text-3xl font-bold text-red-600">{inactivos}</p>
                    </div>
                </div>

            </section>

            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
                <MdMenuBook className="text-base" /> Publicaciones en la plataforma
            </p>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                        <FaBook className="text-gray-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total publicaciones</p>
                        <p className="text-3xl font-bold text-gray-800">{publicacionesAdmin.length}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaCheckCircle className="text-green-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Disponibles</p>
                        <p className="text-3xl font-bold text-green-700">{disponibles}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <FaTimesCircle className="text-red-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Vendidos</p>
                        <p className="text-3xl font-bold text-red-600">{vendidos}</p>
                    </div>
                </div>

            </section>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <MdManageAccounts className="text-xl" /> Acciones rápidas
                </h2>
                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/dashboard/admin/usuarios"
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                        <FaUsers /> Gestionar usuarios
                    </Link>
                    <Link
                        to="/dashboard/admin/publicaciones"
                        className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    >
                        <FaBook /> Moderar publicaciones
                    </Link>
                </div>
            </div>

        </div>
    )
}

PanelAdmin.propTypes = {
    user: PropTypes.shape({
        nombre: PropTypes.string,
        rol: PropTypes.string,
    }),
}

const PanelUsuario = ({ user }) => {
    const { misPublicaciones, cargarMisPublicaciones } = storePublicaciones()

    useEffect(() => {
        cargarMisPublicaciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const total       = misPublicaciones.length
    const disponibles = misPublicaciones.filter(p => p.estado === "disponible").length
    const vendidos    = misPublicaciones.filter(p => p.estado === "vendido").length
    const recientes   = [...misPublicaciones]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)

    const formatFecha = (iso) =>
        new Date(iso).toLocaleDateString("es-EC", { day: "2-digit", month: "short", year: "numeric" })

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="mb-6">
                <h1 className="font-black text-2xl text-gray-600">
                    Bienvenido, {user?.nombre ?? "usuario"} 👋
                </h1>
                <p className="text-gray-400 text-sm mt-1">Aquí tienes un resumen de tus publicaciones</p>
                <hr className="my-4 border-t-2 border-gray-300" />
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                        <FaBook className="text-gray-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total publicaciones</p>
                        <p className="text-3xl font-bold text-gray-800">{total}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaCheckCircle className="text-green-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Disponibles</p>
                        <p className="text-3xl font-bold text-green-700">{disponibles}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <FaTimesCircle className="text-red-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Vendidos</p>
                        <p className="text-3xl font-bold text-red-600">{vendidos}</p>
                    </div>
                </div>

            </section>

            <div className="bg-white rounded-xl shadow p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-700 flex items-center gap-2">
                        <MdBarChart className="text-xl" /> Mis últimas publicaciones
                    </h2>
                    <Link
                        to="/dashboard/mis-publicaciones"
                        className="text-xs text-gray-500 hover:text-gray-900 underline"
                    >
                        Ver todas →
                    </Link>
                </div>

                {recientes.length === 0 ? (
                    <div className="text-center py-8">
                        <FaBook className="text-gray-200 text-5xl mx-auto mb-3" />
                        <p className="text-gray-400 text-sm mb-4">Aún no tienes publicaciones</p>
                        <Link
                            to="/dashboard/create"
                            className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                        >
                            <FaPlus /> Crear primera publicación
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-sm">
                            <thead>
                                <tr className="text-left text-gray-400 border-b border-gray-100">
                                    <th className="pb-2 pr-4">Título</th>
                                    <th className="pb-2 pr-4">Categoría</th>
                                    <th className="pb-2 pr-4">Precio</th>
                                    <th className="pb-2 pr-4">Estado</th>
                                    <th className="pb-2">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recientes.map((pub) => (
                                    <tr key={pub._id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="py-2 pr-4">
                                            <Link
                                                to={`/dashboard/details/${pub._id}`}
                                                className="font-semibold text-gray-700 hover:underline truncate block max-w-[150px]"
                                            >
                                                {pub.titulo}
                                            </Link>
                                        </td>
                                        <td className="py-2 pr-4 text-gray-500 text-xs">
                                            {pub.categoria ?? "—"}
                                        </td>
                                        <td className="py-2 pr-4 text-green-700 font-bold whitespace-nowrap">
                                            ${Number(pub.precio).toFixed(2)}
                                        </td>
                                        <td className="py-2 pr-4">
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                                pub.estado === "disponible"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>
                                                {pub.estado}
                                            </span>
                                        </td>
                                        <td className="py-2 text-gray-400 whitespace-nowrap">
                                            {formatFecha(pub.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold text-gray-700 mb-4">Acciones rápidas</h2>
                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/dashboard/create"
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                        <FaPlus /> Nueva publicación
                    </Link>
                    <Link
                        to="/dashboard/mis-publicaciones"
                        className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    >
                        <FaBook /> Gestionar mis libros
                    </Link>
                    <Link
                        to="/dashboard/list"
                        className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    >
                        Ver todos los libros
                    </Link>
                </div>
            </div>

        </div>
    )
}

PanelUsuario.propTypes = {
    user: PropTypes.shape({
        nombre: PropTypes.string,
        rol: PropTypes.string,
    }),
}

export default function Panel() {
    const { user } = storeProfile()

    if (!user) return null

    return user.rol === "admin"
        ? <PanelAdmin user={user} />
        : <PanelUsuario user={user} />
}
