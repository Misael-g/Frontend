import { useState } from "react"
import { useNavigate } from "react-router"
import PropTypes from "prop-types"
import { FaSearch, FaBook, FaTimesCircle } from "react-icons/fa"
import { MdFilterList, MdVisibility } from "react-icons/md"
import storePublicaciones, { CATEGORIAS } from "../context/storePublicaciones"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

//  valores iniciales 
const FILTROS_INICIALES = {
    titulo:    "",
    categoria: "",
    precioMin: "",
    precioMax: "",
}

const inputStyle = {
    border: `1.5px solid ${C.border}`,
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: '0.875rem',
    color: '#1a2332',
    width: '100%',
    outline: 'none',
    background: '#fff',
    transition: 'border-color 0.2s, box-shadow 0.2s',
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
        <div className="rounded-xl overflow-hidden flex flex-col shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            style={{background:'#fff', border:`1px solid ${C.border}`}}>

            {/* imagen */}
            <div className="relative h-48 flex items-center justify-center overflow-hidden"
                style={{background: C.bg}}>
                {pub.imagen ? (
                    <img
                        src={pub.imagen}
                        alt={pub.titulo}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <FaBook className="text-5xl" style={{color: C.border}} />
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
                    <h3 className="font-bold leading-snug line-clamp-2" style={{color: C.primary}}>{pub.titulo}</h3>
                    <p className="text-xs mt-1" style={{color: C.muted}}>
                        Vendedor: {pub.usuario?.nombre ?? "—"}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-green-600">
                        ${Number(pub.precio).toFixed(2)}
                    </span>
                    <button
                        onClick={() => navigate(`/dashboard/details/${pub._id}`)}
                        className="flex items-center gap-1.5 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                        style={{background: C.primary}}
                        onMouseOver={e => e.currentTarget.style.background='#0f2540'}
                        onMouseOut={e => e.currentTarget.style.background=C.primary}
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

    const focusIn  = e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = '0 0 0 3px rgba(26,58,92,0.08)' }
    const focusOut = e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }

    return (
        <div>
            {/* Encabezado */}
            <h1 className="font-black text-2xl" style={{color: C.primary}}>Buscar libros</h1>
            <hr className="my-3" style={{borderColor: C.border}} />
            <p className="mb-6 text-sm" style={{color: C.muted}}>Filtra por título, categoría o rango de precio</p>

            {/*  Panel de filtros  */}
            <form onSubmit={handleBuscar} className="rounded-xl p-5 mb-8 shadow-sm"
                style={{background:'#fff', border:`1px solid ${C.border}`}}>

                <div className="flex items-center gap-2 mb-4 text-sm font-semibold" style={{color: C.primary}}>
                    <MdFilterList className="text-lg" style={{color: C.accent}} /> Filtros de búsqueda
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Titulo */}
                    <div className="lg:col-span-2">
                        <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{color: C.muted}}>
                            Título
                        </label>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{color: C.muted}} />
                            <input
                                type="text"
                                name="titulo"
                                value={filtros.titulo}
                                onChange={handleChange}
                                placeholder="Ej: Cálculo, Álgebra..."
                                style={{...inputStyle, paddingLeft: 32}}
                                onFocus={focusIn}
                                onBlur={focusOut}
                            />
                        </div>
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{color: C.muted}}>
                            Categoría
                        </label>
                        <select
                            name="categoria"
                            value={filtros.categoria}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={focusIn}
                            onBlur={focusOut}
                        >
                            <option value="">Todas</option>
                            {CATEGORIAS.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Precio minimo */}
                    <div>
                        <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{color: C.muted}}>
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
                            style={inputStyle}
                            onFocus={focusIn}
                            onBlur={focusOut}
                        />
                    </div>

                    {/* Precio máximo */}
                    <div>
                        <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{color: C.muted}}>
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
                            style={inputStyle}
                            onFocus={focusIn}
                            onBlur={focusOut}
                        />
                    </div>

                </div>

                {/* Botones */}
                <div className="flex gap-3 mt-5">
                    <button
                        type="submit"
                        disabled={buscando}
                        className="flex items-center gap-2 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{background: C.primary}}
                        onMouseOver={e => !buscando && (e.currentTarget.style.background='#0f2540')}
                        onMouseOut={e => e.currentTarget.style.background=C.primary}
                    >
                        <FaSearch />
                        {buscando ? "Buscando..." : "Buscar"}
                    </button>

                    {hayFiltros && (
                        <button
                            type="button"
                            onClick={handleLimpiar}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                            style={{border:`1.5px solid ${C.border}`, color: C.muted}}
                            onMouseOver={e => e.currentTarget.style.background=C.bg}
                            onMouseOut={e => e.currentTarget.style.background='transparent'}
                        >
                            <FaTimesCircle /> Limpiar
                        </button>
                    )}
                </div>
            </form>

            
            {buscando && (
                <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent"
                        style={{borderColor:`${C.primary} ${C.border} ${C.border}`}} />
                </div>
            )}

            {/*  Resultados  */}
            {!buscando && buscado && (
                <>
                    <p className="text-sm mb-4" style={{color: C.muted}}>
                        {resultadosBusqueda.length === 0
                            ? "Sin resultados para los filtros aplicados."
                            : `${resultadosBusqueda.length} resultado${resultadosBusqueda.length !== 1 ? "s" : ""} encontrado${resultadosBusqueda.length !== 1 ? "s" : ""}`
                        }
                    </p>

                    {resultadosBusqueda.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <FaBook className="text-7xl mb-4" style={{color: C.border}} />
                            <p className="text-base font-semibold" style={{color: C.muted}}>
                                No encontramos libros con esos criterios
                            </p>
                            <p className="text-sm mt-1" style={{color:'#94a3b8'}}>
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