import { useState } from "react"
import { useNavigate } from "react-router"
import PropTypes from "prop-types"
import { FaSearch, FaBook, FaTimesCircle } from "react-icons/fa"
import { MdFilterList, MdVisibility } from "react-icons/md"
import storePublicaciones, { CATEGORIAS } from "../context/storePublicaciones"

//  valores iniciales 
const FILTROS_INICIALES = {
    titulo:    "",
    categoria: "",
    precioMin: "",
    precioMax: "",
}

//  gadge coloreado por categoría 
const COLOR_CATEGORIA = {
    "Matemáticas":    "bg-blue-100 text-blue-700",
    "Física":         "bg-cyan-100 text-cyan-700",
    "Programación":   "bg-violet-100 text-violet-700",
    "Electrónica":    "bg-yellow-100 text-yellow-700",
    "Química":        "bg-green-100 text-green-700",
    "Administración": "bg-orange-100 text-orange-700",
    "Economía":       "bg-emerald-100 text-emerald-700",
    "Humanidades":    "bg-pink-100 text-pink-700",
    "Inglés":         "bg-sky-100 text-sky-700",
    "Otros":          "bg-gray-100 text-gray-600",
}

//  card individual 
const CardLibro = ({ pub }) => {
    const navigate = useNavigate()
    const badgeClass = COLOR_CATEGORIA[pub.categoria] ?? "bg-gray-100 text-gray-600"

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow flex flex-col overflow-hidden group">

            {/* imagen */}
            <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
                {pub.imagen ? (
                    <img
                        src={pub.imagen}
                        alt={pub.titulo}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <FaBook className="text-gray-300 text-5xl" />
                )}

            
                {pub.categoria && (
                    <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
                        {pub.categoria}
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                    <h3 className="font-bold text-gray-800 leading-snug line-clamp-2">{pub.titulo}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                        Vendedor: {pub.usuario?.nombre ?? "—"}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-green-600">
                        ${Number(pub.precio).toFixed(2)}
                    </span>
                    <button
                        onClick={() => navigate(`/dashboard/details/${pub._id}`)}
                        className="flex items-center gap-1.5 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        <MdVisibility className="text-sm" /> Ver detalle
                    </button>
                </div>
            </div>
        </div>
    )
}

//   CardLibro 
CardLibro.propTypes = {
    pub: PropTypes.shape({
        _id:       PropTypes.string.isRequired,
        titulo:    PropTypes.string.isRequired,
        precio:    PropTypes.number.isRequired,
        imagen:    PropTypes.string,
        categoria: PropTypes.string,
        usuario:   PropTypes.shape({
            nombre: PropTypes.string,
        }),
    }).isRequired,
}

//  Componente principal 
const Buscador = () => {
    const { buscarPublicaciones, resultadosBusqueda, buscando, limpiarBusqueda } = storePublicaciones()

    const [filtros, setFiltros] = useState(FILTROS_INICIALES)
    const [buscado, setBuscado] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFiltros((prev) => ({ ...prev, [name]: value }))
    }

    const handleBuscar = async (e) => {
        e.preventDefault()
        await buscarPublicaciones(filtros)
        setBuscado(true)
    }

    const handleLimpiar = () => {
        setFiltros(FILTROS_INICIALES)
        limpiarBusqueda()
        setBuscado(false)
    }

    const hayFiltros = Object.values(filtros).some((v) => v !== "")

    return (
        <div>
            {/* Encabezado */}
            <h1 className="font-black text-4xl text-gray-500">Buscar libros</h1>
            <hr className="my-4 border-t-2 border-gray-300" />
            <p className="mb-6 text-gray-500">Filtra por título, categoría o rango de precio</p>

            {/*  Panel de filtros  */}
            <form onSubmit={handleBuscar} className="bg-white rounded-xl shadow p-5 mb-8">

                <div className="flex items-center gap-2 mb-4 text-gray-600 font-semibold text-sm">
                    <MdFilterList className="text-lg" /> Filtros de búsqueda
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Titulo */}
                    <div className="lg:col-span-2">
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
                                placeholder="Ej: Cálculo, Álgebra..."
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                            />
                        </div>
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                            Categoría
                        </label>
                        <select
                            name="categoria"
                            value={filtros.categoria}
                            onChange={handleChange}
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 bg-white"
                        >
                            <option value="">Todas</option>
                            {CATEGORIAS.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Precio minimo */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                            Precio mínimo (USD)
                        </label>
                        <input
                            type="number"
                            name="precioMin"
                            value={filtros.precioMin}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                        />
                    </div>

                    {/* Precio máximo */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                            Precio máximo (USD)
                        </label>
                        <input
                            type="number"
                            name="precioMax"
                            value={filtros.precioMax}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            placeholder="999.00"
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                        />
                    </div>

                </div>

                {/* Botones */}
                <div className="flex gap-3 mt-5">
                    <button
                        type="submit"
                        disabled={buscando}
                        className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <FaSearch />
                        {buscando ? "Buscando..." : "Buscar"}
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

            
            {buscando && (
                <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-800 border-t-transparent" />
                </div>
            )}

            {/*  Resultados  */}
            {!buscando && buscado && (
                <>
                    <p className="text-sm text-gray-500 mb-4">
                        {resultadosBusqueda.length === 0
                            ? "Sin resultados para los filtros aplicados."
                            : `${resultadosBusqueda.length} resultado${resultadosBusqueda.length !== 1 ? "s" : ""} encontrado${resultadosBusqueda.length !== 1 ? "s" : ""}`
                        }
                    </p>

                    {resultadosBusqueda.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                            <FaBook className="text-7xl mb-4" />
                            <p className="text-gray-500 text-base font-semibold">
                                No encontramos libros con esos criterios
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                Prueba con otros filtros o amplía el rango de precio
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                            {resultadosBusqueda.map((pub) => (
                                <CardLibro key={pub._id} pub={pub} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Buscador