import { useEffect } from "react"
import { Link } from "react-router"
import { MdVisibility } from "react-icons/md"
import { FaBook } from "react-icons/fa"
import storePublicaciones from "../../context/storePublicaciones"

const Table = () => {
    const { publicaciones, listarPublicaciones } = storePublicaciones()

    useEffect(() => {
        listarPublicaciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {publicaciones.length === 0 ? (
                <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <span className="font-medium">No hay publicaciones disponibles por el momento.</span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full mt-2 table-auto shadow-lg bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-slate-400">
                            <tr>
                                <th className="p-3 text-left">N°</th>
                                <th className="p-3 text-left">Imagen</th>
                                <th className="p-3 text-left">Título</th>
                                <th className="p-3 text-left">Precio</th>
                                <th className="p-3 text-left">Estado</th>
                                <th className="p-3 text-left">Vendedor</th>
                                <th className="p-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {publicaciones.map((pub, index) => (
                                <tr key={pub._id} className="hover:bg-gray-50 border-b border-gray-100">
                                    <td className="p-3 text-gray-600">{index + 1}</td>

                                    {/* imagen */}
                                    <td className="p-3">
                                        {pub.imagen ? (
                                            <img
                                                src={pub.imagen}
                                                alt={pub.titulo}
                                                className="h-12 w-12 object-cover rounded-md border border-gray-200"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                                                <FaBook className="text-gray-400 text-xl" />
                                            </div>
                                        )}
                                    </td>

                                    {/* titulo */}
                                    <td className="p-3 font-semibold text-gray-800 max-w-xs truncate">
                                        {pub.titulo}
                                    </td>

                                    {/* precio */}
                                    <td className="p-3 text-green-700 font-bold">
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
                                    <td className="p-3 text-gray-600 text-sm">
                                        {pub.usuario?.nombre ?? "—"}
                                    </td>

                                    {/* acciones */}
                                    <td className="p-3 text-center">
                                        <Link
                                            to={`/dashboard/details/${pub._id}`}
                                            title="Ver detalle"
                                            className="inline-flex items-center gap-1 text-sm text-white bg-gray-700 hover:bg-gray-900 px-3 py-1.5 rounded-md transition-colors"
                                        >
                                            <MdVisibility className="text-base" />
                                            Ver
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default Table