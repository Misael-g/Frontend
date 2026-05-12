import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { FaBook, FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import { MdToggleOn, MdToggleOff } from "react-icons/md"
import storePublicaciones from "../context/storePublicaciones"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

const MisPublicaciones = () => {
    const navigate = useNavigate()
    const { misPublicaciones, cargarMisPublicaciones, eliminarPublicacion, cambiarEstado } = storePublicaciones()
    const [loadingId, setLoadingId] = useState(null)

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
                        <h1 className="font-black text-2xl" style={{color: C.primary}}>Mis publicaciones</h1>
                        <hr className="my-3" style={{borderColor: C.border}} />
                        <p className="mb-6 text-sm" style={{color: C.muted}}>
                            Administra todos tus libros publicados
                        </p>
                    </div>
                    <Link
                        to="/dashboard/create"
                        className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                        style={{background: C.primary}}
                        onMouseOver={e => e.currentTarget.style.background = '#0f2540'}
                        onMouseOut={e =>  e.currentTarget.style.background = C.primary}
                    >
                        <FaPlus /> Nueva publicación
                    </Link>
                </div>

                {/* sin publicaciones */}
                {misPublicaciones.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <FaBook className="text-6xl mb-4" style={{color: C.border}} />
                        <p className="text-lg font-semibold mb-1" style={{color: C.muted}}>
                            Aún no tienes publicaciones
                        </p>
                        <p className="text-sm mb-6" style={{color:'#94a3b8'}}>
                            Publica tu primer libro y comienza a vender
                        </p>
                        <Link
                            to="/dashboard/create"
                            className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                            style={{background: C.primary}}
                            onMouseOver={e => e.currentTarget.style.background = '#0f2540'}
                            onMouseOut={e =>  e.currentTarget.style.background = C.primary}
                        >
                            <FaPlus /> Crear publicación
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl shadow-sm"
                        style={{border:`1px solid ${C.border}`}}>
                        <table className="w-full table-auto bg-white rounded-xl overflow-hidden">
                            <thead>
                                <tr style={{background: C.primary}}>
                                    {['N°','Imagen','Título','Precio','Estado','Acciones'].map(h => (
                                        <th key={h} className={`p-3 text-xs font-semibold uppercase tracking-wide text-white ${
                                            h === 'Estado' || h === 'Acciones' ? 'text-center' : 'text-left'
                                        }`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {misPublicaciones.map((pub, index) => (
                                    <tr key={pub._id} className="border-b transition-colors hover:bg-blue-50/30"
                                        style={{borderColor: C.border}}>

                                        {/* N° */}
                                        <td className="p-3 text-sm" style={{color: C.muted}}>{index + 1}</td>

                                        {/* imagen */}
                                        <td className="p-3">
                                            {pub.imagen ? (
                                                <img
                                                    src={pub.imagen}
                                                    alt={pub.titulo}
                                                    className="h-11 w-11 object-cover rounded-lg cursor-pointer"
                                                    style={{border:`1px solid ${C.border}`}}
                                                    onClick={() => navigate(`/dashboard/details/${pub._id}`)}
                                                />
                                            ) : (
                                                <div
                                                    className="h-11 w-11 rounded-lg flex items-center justify-center cursor-pointer"
                                                    style={{background: C.bg}}
                                                    onClick={() => navigate(`/dashboard/details/${pub._id}`)}
                                                >
                                                    <FaBook style={{color: C.border}} />
                                                </div>
                                            )}
                                        </td>

                                        {/* título */}
                                        <td className="p-3">
                                            <button
                                                onClick={() => navigate(`/dashboard/details/${pub._id}`)}
                                                className="font-semibold text-sm hover:underline text-left max-w-xs truncate block transition-colors"
                                                style={{color: C.primary}}
                                            >
                                                {pub.titulo}
                                            </button>
                                            <p className="text-xs mt-0.5 truncate max-w-xs" style={{color: C.muted}}>
                                                {pub.descripcion}
                                            </p>
                                        </td>

                                        {/* precio */}
                                        <td className="p-3 font-bold text-green-700 whitespace-nowrap text-sm">
                                            ${Number(pub.precio).toFixed(2)}
                                        </td>

                                        {/* estado — toggle */}
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

                                        {/* acciones */}
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-2">

                                                <Link
                                                    to={`/dashboard/update/${pub._id}`}
                                                    title="Editar"
                                                    className="inline-flex items-center gap-1 text-xs text-white px-3 py-1.5 rounded-md transition-colors"
                                                    style={{background: C.primary}}
                                                    onMouseOver={e => e.currentTarget.style.background = '#0f2540'}
                                                    onMouseOut={e =>  e.currentTarget.style.background = C.primary}
                                                >
                                                    <FaEdit /> Editar
                                                </Link>

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
                        <p className="text-xs px-4 py-2 text-right" style={{color:'#94a3b8'}}>
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