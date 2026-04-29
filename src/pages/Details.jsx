import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import { ToastContainer } from "react-toastify"
import { FaBook, FaPhone, FaEnvelope, FaUser, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa"
import { MdToggleOn, MdToggleOff } from "react-icons/md"
import storePublicaciones from "../context/storePublicaciones"
import storeAuth from "../context/storeAuth"


const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { detallePublicacion, publicacionActual, eliminarPublicacion, cambiarEstado } = storePublicaciones()
    const { usuario } = storeAuth()

    const [loadingEstado, setLoadingEstado] = useState(false)
    const [loadingEliminar, setLoadingEliminar] = useState(false)

    useEffect(() => {
        detallePublicacion(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if (!publicacionActual) {
        return (
            <div className="flex items-center justify-center h-40">
                <p className="text-gray-400 text-lg">Cargando publicación...</p>
            </div>
        )
    }

    // si usuario autenticado es el dueño
    const esDueno = usuario?._id === publicacionActual.usuario?._id

    const handleCambiarEstado = async () => {
        const nuevoEstado = publicacionActual.estado === "disponible" ? "vendido" : "disponible"
        setLoadingEstado(true)
        await cambiarEstado(id, nuevoEstado)
        await detallePublicacion(id) // recargar
        setLoadingEstado(false)
    }

    const handleEliminar = async () => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) return
        setLoadingEliminar(true)
        const ok = await eliminarPublicacion(id)
        setLoadingEliminar(false)
        if (ok) navigate("/dashboard/list")
    }

    return (
        <>
            <ToastContainer />

            <div>
                {/* encabezado */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="font-black text-4xl text-gray-500">Detalle</h1>
                        <hr className="my-3 border-t-2 border-gray-300" />
                        <p className="text-gray-500">Información completa de la publicación</p>
                    </div>
                    <Link
                        to="/dashboard/list"
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
                    >
                        <FaArrowLeft /> Volver
                    </Link>
                </div>

                {/* tarjeta principal */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mt-4">
                    <div className="flex flex-col md:flex-row gap-0">

                        {/* Imagen */}
                        <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-6 min-h-64">
                            {publicacionActual.imagen ? (
                                <img
                                    src={publicacionActual.imagen}
                                    alt={publicacionActual.titulo}
                                    className="object-contain max-h-72 rounded-lg"
                                />
                            ) : (
                                <div className="flex flex-col items-center text-gray-300">
                                    <FaBook className="text-7xl mb-3" />
                                    <span className="text-sm">Sin imagen</span>
                                </div>
                            )}
                        </div>

                        {/* info */}
                        <div className="md:w-2/3 p-8 flex flex-col justify-between">

                            {/* titulo y estado */}
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h2 className="text-2xl font-bold text-gray-800">{publicacionActual.titulo}</h2>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                                        publicacionActual.estado === "disponible"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}>
                                        {publicacionActual.estado}
                                    </span>
                                </div>

                                {/* rrecio */}
                                <p className="text-3xl font-black text-green-600 mb-4">
                                    ${Number(publicacionActual.precio).toFixed(2)}
                                </p>

                                {/* Descripción */}
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {publicacionActual.descripcion}
                                </p>

                                {/* datos del vendedor */}
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-200">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contacto del vendedor</p>
                                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                                        <FaUser className="text-gray-400" />
                                        <span>{publicacionActual.usuario?.nombre ?? "—"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                                        <FaEnvelope className="text-gray-400" />
                                        <a href={`mailto:${publicacionActual.usuario?.email}`} className="hover:underline text-blue-600">
                                            {publicacionActual.usuario?.email ?? "—"}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                                        <FaPhone className="text-gray-400" />
                                        <span>{publicacionActual.usuario?.telefono ?? "—"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* acciones del dueño */}
                            {esDueno && (
                                <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-200">

                                    {/* Editar */}
                                    <Link
                                        to={`/dashboard/update/${id}`}
                                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                                    >
                                        <FaEdit /> Editar
                                    </Link>

                                    {/* cambiar estado */}
                                    <button
                                        onClick={handleCambiarEstado}
                                        disabled={loadingEstado}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm disabled:opacity-60"
                                    >
                                        {publicacionActual.estado === "disponible"
                                            ? <><MdToggleOff className="text-xl" /> Marcar como vendido</>
                                            : <><MdToggleOn className="text-xl" /> Marcar disponible</>
                                        }
                                    </button>

                                    {/* eliminar */}
                                    <button
                                        onClick={handleEliminar}
                                        disabled={loadingEliminar}
                                        className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors text-sm disabled:opacity-60"
                                    >
                                        <FaTrash /> {loadingEliminar ? "Eliminando..." : "Eliminar"}
                                    </button>

                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Details