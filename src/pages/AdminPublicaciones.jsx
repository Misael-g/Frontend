import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { FaBook, FaTrash, FaSearch, FaTimesCircle } from "react-icons/fa"
import { MdFilterList } from "react-icons/md"
import storeAdmin from "../context/storeAdmin"
import { CATEGORIAS } from "../context/storePublicaciones"

const FILTROS_INICIALES = { titulo: "", categoria: "", estado: "" }

const AdminPublicaciones = () => {
    const { publicacionesAdmin, listarTodasPublicaciones, eliminarPublicacionAdmin, loadingAdmin } = storeAdmin()
    const [filtros, setFiltros]   = useState(FILTROS_INICIALES)
    const [loadingId, setLoadingId] = useState(null)

    // incila sin filtros
    useEffect(() => {
        listarTodasPublicaciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFiltros((prev) => ({ ...prev, [name]: value }))
    }

    const handleBuscar = async (e) => {
        e.preventDefault()
        await listarTodasPublicaciones(filtros)
    }

    const handleLimpiar = async () => {
        setFiltros(FILTROS_INICIALES)
        await listarTodasPublicaciones()
    }

    const handleEliminar = async (id, titulo) => {
        if (!window.confirm(`¿Eliminar la publicación "${titulo}"? Esta acción es irreversible.`)) return
        setLoadingId(id)
        await eliminarPublicacionAdmin(id)
        setLoadingId(null)
    }

    const hayFiltros = Object.values(filtros).some((v) => v !== "")

    // metricas rapidas
    const disponibles = publicacionesAdmin.filter(p => p.estado === "disponible").length
    const vendidos    = publicacionesAdmin.filter(p => p.estado === "vendido").length

    return (
        <>
            <ToastContainer />

            <div>
                {/* encabezado */}
                <h1 className="font-black text-4xl text-gray-500">Moderación de publicaciones</h1>
                <hr className="my-4 border-t-2 border-gray-300" />
                <p className="mb-6 text-gray-500">Revisa y elimina publicaciones inapropiadas de la plataforma</p>

                {/* metricas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
                        <div className="bg-gray-100 p-3 rounded-full"><FaBook className="text-gray-600 text-xl" /></div>
                        <div>
                            <p className="text-xs text-gray-500">Total mostradas</p>
                            <p className="text-2xl font-bold text-gray-800">{publicacionesAdmin.length}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
                        <div className="bg-green-100 p-3 rounded-full"><FaBook className="text-green-600 text-xl" /></div>
                        <div>
                            <p className="text-xs text-gray-500">Disponibles</p>
                            <p className="text-2xl font-bold text-green-700">{disponibles}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
                        <div className="bg-red-100 p-3 rounded-full"><FaBook className="text-red-600 text-xl" /></div>
                        <div>
                            <p className="text-xs text-gray-500">Vendidos</p>
                            <p className="text-2xl font-bold text-red-600">{vendidos}</p>
                        </div>
                    </div>
                </div>

                {/* panel de filtros */}
                <form onSubmit={handleBuscar} className="bg-white rounded-xl shadow p-5 mb-6">
                    <div className="flex items-center gap-2 mb-4 text-gray-600 font-semibold text-sm">
                        <MdFilterList className="text-lg" /> Filtros
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        {/* titulo */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                Título
                            </label>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                <input
                                    type="text"
                                    name="titulo"
                                    value={filtros.titulo}
                                    onChange={handleChange}
                                    placeholder="Buscar por título..."
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                                />
                            </div>
                        </div>

                        {/* categoria */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                Categoría
                            </label>
                            <select
                                name="categoria"
                                value={filtros.categoria}
                                onChange={handleChange}
                                className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-500 bg-white"
                            >
                                <option value="">Todas</option>
                                {CATEGORIAS.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* estado */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                Estado
                            </label>
                            <select
                                name="estado"
                                value={filtros.estado}
                                onChange={handleChange}
                                className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-500 bg-white"
                            >
                                <option value="">Todos</option>
                                <option value="disponible">Disponible</option>
                                <option value="vendido">Vendido</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            type="submit"
                            disabled={loadingAdmin}
                            className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm disabled:opacity-60"
                        >
                            <FaSearch /> Filtrar
                        </button>
                        {hayFiltros && (
                            <button
                                type="button"
                                onClick={handleLimpiar}
                                className="flex items-center gap-2 border border-gray-300 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                            >
                                <FaTimesCircle /> Limpiar
                            </button>
                        )}
                    </div>
                </form>

                {/* tabla */}
                {loadingAdmin ? (
                    <div className="flex justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-800 border-t-transparent" />
                    </div>
                ) : publicacionesAdmin.length === 0 ? (
                    <div className="flex flex-col items-center py-16 text-gray-300">
                        <FaBook className="text-6xl mb-4" />
                        <p className="text-gray-500 font-semibold">No hay publicaciones con esos filtros</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto shadow-lg bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-800 text-slate-400">
                                <tr>
                                    <th className="p-3 text-left">N°</th>
                                    <th className="p-3 text-left">Imagen</th>
                                    <th className="p-3 text-left">Título</th>
                                    <th className="p-3 text-left">Categoría</th>
                                    <th className="p-3 text-left">Precio</th>
                                    <th className="p-3 text-left">Estado</th>
                                    <th className="p-3 text-left">Vendedor</th>
                                    <th className="p-3 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {publicacionesAdmin.map((pub, index) => (
                                    <tr key={pub._id} className="border-b border-gray-100 hover:bg-gray-50">

                                        <td className="p-3 text-gray-500 text-sm">{index + 1}</td>

                                        {/* Imagen */}
                                        <td className="p-3">
                                            {pub.imagen ? (
                                                <img
                                                    src={pub.imagen}
                                                    alt={pub.titulo}
                                                    className="h-12 w-12 object-cover rounded-md border border-gray-200"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                                                    <FaBook className="text-gray-300 text-xl" />
                                                </div>
                                            )}
                                        </td>

                                        {/* Título */}
                                        <td className="p-3 font-semibold text-gray-800 max-w-xs">
                                            <p className="truncate max-w-[180px]">{pub.titulo}</p>
                                            <p className="text-xs text-gray-400 truncate max-w-[180px]">{pub.descripcion}</p>
                                        </td>

                                        {/* Categoria */}
                                        <td className="p-3 text-sm text-gray-500">{pub.categoria}</td>

                                        {/* precio */}
                                        <td className="p-3 font-bold text-green-700 whitespace-nowrap">
                                            ${Number(pub.precio).toFixed(2)}
                                        </td>

                                        {/* estado */}
                                        <td className="p-3">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                pub.estado === "disponible"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>
                                                {pub.estado}
                                            </span>
                                        </td>

                                        {/* vendedor */}
                                        <td className="p-3 text-sm text-gray-600">
                                            <p className="font-semibold">{pub.usuario?.nombre ?? "—"}</p>
                                            <p className="text-xs text-gray-400">{pub.usuario?.email ?? ""}</p>
                                        </td>

                                        {/* eliminar */}
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handleEliminar(pub._id, pub.titulo)}
                                                disabled={loadingId === pub._id}
                                                className="inline-flex items-center gap-1 text-xs text-white bg-red-700 hover:bg-red-900 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                            >
                                                <FaTrash />
                                                {loadingId === pub._id ? "..." : "Eliminar"}
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <p className="text-xs text-gray-400 mt-3 text-right">
                            {publicacionesAdmin.length} publicación{publicacionesAdmin.length !== 1 ? "es" : ""} mostrada{publicacionesAdmin.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminPublicaciones