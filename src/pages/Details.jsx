import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import { ToastContainer } from "react-toastify"
import { FaBook, FaPhone, FaEnvelope, FaUser, FaArrowLeft, FaEdit, FaTrash, FaWhatsapp } from "react-icons/fa"
import { MdToggleOn, MdToggleOff } from "react-icons/md"
import storePublicaciones from "../context/storePublicaciones"
import storeAuth from "../context/storeAuth"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

const telefonoAWhatsapp = (telefono) => {
    if (!telefono) return null
    const limpio = telefono.replace(/\D/g, "")
    if (limpio.startsWith("0") && limpio.length === 10) {
        return "593" + limpio.slice(1)
    }
    if (limpio.startsWith("593")) return limpio
    return null
}

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
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent"
                    style={{borderColor:`${C.primary} ${C.border} ${C.border}`}} />
            </div>
        )
    }

    const esDueno = usuario?._id === publicacionActual.usuario?._id
    const numeroWa = telefonoAWhatsapp(publicacionActual.usuario?.telefono)
    const mensajeWa = encodeURIComponent(
        `¡Hola! Estoy interesado en el libro "${publicacionActual.titulo}" en UniBooks por $${Number(publicacionActual.precio).toFixed(2)} aún está disponible?`
    )
    const linkWhatsapp = numeroWa ? `https://wa.me/${numeroWa}?text=${mensajeWa}` : null

    const handleCambiarEstado = async () => {
        const nuevoEstado = publicacionActual.estado === "disponible" ? "vendido" : "disponible"
        setLoadingEstado(true)
        await cambiarEstado(id, nuevoEstado)
        await detallePublicacion(id)
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
                        <h1 className="font-black text-2xl" style={{color: C.primary}}>Detalle</h1>
                        <hr className="my-3" style={{borderColor: C.border}} />
                        <p className="text-sm" style={{color: C.muted}}>Información completa de la publicación</p>
                    </div>
                    <Link
                        to="/dashboard/list"
                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors"
                        style={{border:`1px solid ${C.border}`, color: C.muted}}
                        onMouseOver={e => e.currentTarget.style.background=C.bg}
                        onMouseOut={e => e.currentTarget.style.background='transparent'}
                    >
                        <FaArrowLeft /> Volver
                    </Link>
                </div>

                {/* tarjeta principal */}
                <div className="rounded-xl shadow-sm overflow-hidden mt-4"
                    style={{background:'#fff', border:`1px solid ${C.border}`}}>
                    <div className="flex flex-col md:flex-row">

                        {/* Imagen */}
                        <div className="md:w-1/3 flex items-center justify-center p-6 min-h-64"
                            style={{background: C.bg}}>
                            {publicacionActual.imagen ? (
                                <img
                                    src={publicacionActual.imagen}
                                    alt={publicacionActual.titulo}
                                    className="object-contain max-h-72 rounded-lg"
                                />
                            ) : (
                                <div className="flex flex-col items-center" style={{color: C.border}}>
                                    <FaBook className="text-7xl mb-3" />
                                    <span className="text-sm" style={{color: C.muted}}>Sin imagen</span>
                                </div>
                            )}
                        </div>

                        {/* info */}
                        <div className="md:w-2/3 p-8 flex flex-col justify-between">

                            {/* titulo y estado */}
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h2 className="text-2xl font-bold" style={{color: C.primary}}>{publicacionActual.titulo}</h2>
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
                                <p className="leading-relaxed mb-6 text-sm" style={{color: C.muted}}>
                                    {publicacionActual.descripcion}
                                </p>

                                {/* datos del vendedor */}
                                <div className="rounded-lg p-4 space-y-2"
                                    style={{background: C.bg, border:`1px solid ${C.border}`}}>
                                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{color: C.muted}}>
                                        Contacto del vendedor
                                    </p>
                                    <div className="flex items-center gap-2 text-sm" style={{color:'#334155'}}>
                                        <FaUser style={{color: C.accent}} />
                                        <span>{publicacionActual.usuario?.nombre ?? "—"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaEnvelope style={{color: C.accent}} />
                                        <a href={`mailto:${publicacionActual.usuario?.email}`} className="hover:underline text-blue-600">
                                            {publicacionActual.usuario?.email ?? "—"}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm" style={{color:'#334155'}}>
                                        <FaPhone style={{color: C.accent}} />
                                        <span>{publicacionActual.usuario?.telefono ?? "—"}</span>
                                    </div>
                                </div>

                                {!esDueno && publicacionActual.estado === "disponible" && (
                                    <div className="mt-5">
                                        {linkWhatsapp ? (
                                            <a
                                                href={linkWhatsapp}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors shadow-md hover:shadow-lg text-sm"
                                            >
                                                <FaWhatsapp className="text-xl" />
                                                Contactar al vendedor por WhatsApp
                                            </a>
                                        ) : (
                                            <p className="text-xs italic" style={{color: C.muted}}>
                                                El vendedor no tiene un número WhatsApp válido registrado.
                                            </p>
                                        )}
                                    </div>
                                )}

                            </div>

                            {/* acciones del dueño */}
                            {esDueno && (
                                <div className="flex flex-wrap gap-3 mt-6 pt-5"
                                    style={{borderTop:`1px solid ${C.border}`}}>

                                    {/* Editar */}
                                    <Link
                                        to={`/dashboard/update/${id}`}
                                        className="flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                                        style={{background: C.primary}}
                                        onMouseOver={e => e.currentTarget.style.background='#0f2540'}
                                        onMouseOut={e => e.currentTarget.style.background=C.primary}
                                    >
                                        <FaEdit /> Editar
                                    </Link>

                                    {/* cambiar estado */}
                                    <button
                                        onClick={handleCambiarEstado}
                                        disabled={loadingEstado}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm font-semibold disabled:opacity-60"
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