import { useEffect } from "react"
import { Link } from "react-router"
import { MdVisibility } from "react-icons/md"
import { FaBook } from "react-icons/fa"
import storePublicaciones from "../../context/storePublicaciones"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

const Table = () => {
    const { publicaciones, listarPublicaciones } = storePublicaciones()

    useEffect(() => {
        listarPublicaciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {publicaciones.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <FaBook className="text-6xl mb-4" style={{color: C.border}} />
                    <p className="font-semibold mb-1" style={{color: C.muted}}>
                        No hay publicaciones disponibles por el momento.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-sm"
                    style={{border:`1px solid ${C.border}`}}>
                    <table className="w-full mt-0 table-auto bg-white rounded-xl overflow-hidden">
                        <thead>
                            <tr style={{background: C.primary}}>
                                {['N°','Imagen','Título','Precio','Estado','Vendedor','Acciones'].map(h => (
                                    <th key={h} className="p-3 text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {publicaciones.map((pub, index) => (
                                <tr key={pub._id} className="border-b transition-colors hover:bg-blue-50/30"
                                    style={{borderColor: C.border}}>

                                    <td className="p-3 text-sm" style={{color: C.muted}}>{index + 1}</td>

                                    {/* imagen */}
                                    <td className="p-3">
                                        {pub.imagen ? (
                                            <img
                                                src={pub.imagen}
                                                alt={pub.titulo}
                                                className="h-11 w-11 object-cover rounded-lg"
                                                style={{border:`1px solid ${C.border}`}}
                                            />
                                        ) : (
                                            <div className="h-11 w-11 rounded-lg flex items-center justify-center"
                                                style={{background: C.bg}}>
                                                <FaBook style={{color: C.border}} />
                                            </div>
                                        )}
                                    </td>

                                    {/* titulo */}
                                    <td className="p-3 font-semibold text-sm max-w-xs truncate"
                                        style={{color: C.primary}}>
                                        {pub.titulo}
                                    </td>

                                    {/* precio */}
                                    <td className="p-3 font-bold text-green-700 text-sm">
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
                                    <td className="p-3 text-sm" style={{color: C.muted}}>
                                        {pub.usuario?.nombre ?? "—"}
                                    </td>

                                    {/* acciones */}
                                    <td className="p-3 text-center">
                                        <Link
                                            to={`/dashboard/details/${pub._id}`}
                                            title="Ver detalle"
                                            className="inline-flex items-center gap-1.5 text-xs text-white px-3 py-1.5 rounded-md transition-colors"
                                            style={{background: C.primary}}
                                            onMouseOver={e => e.currentTarget.style.background = '#0f2540'}
                                            onMouseOut={e =>  e.currentTarget.style.background = C.primary}
                                        >
                                            <MdVisibility className="text-sm" /> Ver
                                        </Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="text-xs px-4 py-2 text-right" style={{color:'#94a3b8'}}>
                        {publicaciones.length} libro{publicaciones.length !== 1 ? "s" : ""} disponible{publicaciones.length !== 1 ? "s" : ""}
                    </p>
                </div>
            )}
        </>
    )
}

export default Table