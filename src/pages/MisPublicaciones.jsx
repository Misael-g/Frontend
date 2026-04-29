import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { FaBook, FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import { MdToggleOn, MdToggleOff } from "react-icons/md"
import storePublicaciones from "../context/storePublicaciones"


const MisPublicaciones = () => {
    const navigate = useNavigate()
    const { misPublicaciones, cargarMisPublicaciones, eliminarPublicacion, cambiarEstado } = storePublicaciones()
    const [loadingId, setLoadingId] = useState(null) // id del item en proceso

    useEffect(() => {
        cargarMisPublicaciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Eliminar esta publicación? Esta acción no se puede deshacer.")) return
        setLoadingId(id)
        await eliminarPublicacion(id)
        setLoadingId(null)
    }

    const handleCambiarEstado = async (pub) => {
        const nuevoEstado = pub.estado === "disponible" ? "vendido" : "disponible"
        setLoadingId(pub._id)
        await cambiarEstado(pub._id, nuevoEstado)
        setLoadingId(null)
    }

    return (
        <>
            <ToastContainer />

            <div>
                {/* encabezado */}
                <div className="flex items-center justify-between mb-1">
                    <div>
                        <h1 className="font-black text-4xl text-gray-500">Mis publicaciones</h1>
                        <hr className="my-4 border-t-2 border-gray-300" />
                        <p className="mb-6 text-gray-500">Administra todos tus libros publicados</p>
                    </div>
                    <Link
                        to="/dashboard/create"
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm whitespace-nowrap"
                    >
                        <FaPlus /> Nueva publicación
                    </Link>
                </div>

                {/* sin publicaciones */}
                {misPublicaciones.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <FaBook className="text-6xl mb-4 opacity-30" />
                        <p className="text-lg font-semibold mb-1">Aún no tienes publicaciones</p>
                        <p className="text-sm mb-6">Publica tu primer libro y comienza a vender</p>
                        <Link
                            to="/dashboard/create"
                            className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                        >
                            <FaPlus /> Crear publicación
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto shadow-lg bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-800 text-slate-400">
                                <tr>
                                    <th className="p-3 text-left">N°</th>
                                    <th className="p-3 text-left">Imagen</th>
                                    <th className="p-3 text-left">Título</th>
                                    <th className="p-3 text-left">Precio</th>
                                    <th className="p-3 text-center">Estado</th>
                                    <th className="p-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {misPublicaciones.map((pub, index) => (
                                    <tr key={pub._id} className="border-b border-gray-100 hover:bg-gray-50">

                                        {/* N° */}
                                        <td className="p-3 text-gray-500 text-sm">{index + 1}</td>

                                        {/* imagen */}
                                        <td className="p-3">
                                            {pub.imagen ? (
                                                <img
                                                    src={pub.imagen}
                                                    alt={pub.titulo}
                                                    className="h-12 w-12 object-cover rounded-md border border-gray-200 cursor-pointer"
                                                    onClick={() => navigate(`/dashboard/details/${pub._id}`)}
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer"
                                                    onClick={() => navigate(`/dashboard/details/${pub._id}`)}>
                                                    <FaBook className="text-gray-300 text-xl" />
                                                </div>
                                            )}
                                        </td>

                                        {/* tulo */}
                                        <td className="p-3">
                                            <button
                                                onClick={() => navigate(`/dashboard/details/${pub._id}`)}
                                                className="font-semibold text-gray-800 hover:underline text-left max-w-xs truncate block"
                                            >
                                                {pub.titulo}
                                            </button>
                                            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{pub.descripcion}</p>
                                        </td>

                                        {/* precio */}
                                        <td className="p-3 font-bold text-green-700 whitespace-nowrap">
                                            ${Number(pub.precio).toFixed(2)}
                                        </td>

                                        {/* estado — toggle inline */}
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handleCambiarEstado(pub)}
                                                disabled={loadingId === pub._id}
                                                title={`Cambiar a ${pub.estado === "disponible" ? "vendido" : "disponible"}`}
                                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors disabled:opacity-50 ${
                                                    pub.estado === "disponible"
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                                }`}
                                            >
                                                {pub.estado === "disponible"
                                                    ? <><MdToggleOn className="text-base" /> disponible</>
                                                    : <><MdToggleOff className="text-base" /> vendido</>
                                                }
                                            </button>
                                        </td>

                                        {/* accciones */}
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-2">

                                                {/* Editar */}
                                                <Link
                                                    to={`/dashboard/update/${pub._id}`}
                                                    title="Editar"
                                                    className="inline-flex items-center gap-1 text-xs text-white bg-gray-700 hover:bg-gray-900 px-3 py-1.5 rounded-md transition-colors"
                                                >
                                                    <FaEdit /> Editar
                                                </Link>

                                                {/* eliminar */}
                                                <button
                                                    onClick={() => handleEliminar(pub._id)}
                                                    disabled={loadingId === pub._id}
                                                    title="Eliminar"
                                                    className="inline-flex items-center gap-1 text-xs text-white bg-red-700 hover:bg-red-900 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                                                >
                                                    <FaTrash />
                                                    {loadingId === pub._id ? "..." : "Eliminar"}
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* resumen */}
                        <p className="text-xs text-gray-400 mt-3 text-right">
                            {misPublicaciones.length} publicación{misPublicaciones.length !== 1 ? "es" : ""} en total
                            {" · "}
                            {misPublicaciones.filter(p => p.estado === "disponible").length} disponible{misPublicaciones.filter(p => p.estado === "disponible").length !== 1 ? "s" : ""}
                            {" · "}
                            {misPublicaciones.filter(p => p.estado === "vendido").length} vendido{misPublicaciones.filter(p => p.estado === "vendido").length !== 1 ? "s" : ""}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default MisPublicaciones