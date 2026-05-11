import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { FaBook, FaTrash, FaSearch, FaTimesCircle } from "react-icons/fa"
import { MdFilterList } from "react-icons/md"
import storeAdmin from "../context/storeAdmin"
import { CATEGORIAS } from "../context/storePublicaciones"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }
const FILTROS_INICIALES = { titulo: "", categoria: "", estado: "" }

const inputStyle = {
    border: `1.5px solid ${C.border}`,
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: '0.875rem',
    color: '#1a2332',
    width: '100%',
    outline: 'none',
    background: '#fff',
    transition: 'border-color 0.2s',
}

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
    const disponibles = publicacionesAdmin.filter(p => p.estado === "disponible").length
    const vendidos    = publicacionesAdmin.filter(p => p.estado === "vendido").length

    const focusIn  = e => { e.target.style.borderColor = C.primary }
    const focusOut = e => { e.target.style.borderColor = C.border }

    return (
        <>
            <ToastContainer />

            <div>
                {/* encabezado */}
                <h1 className="font-black text-2xl" style={{color: C.primary}}>Moderación de publicaciones</h1>
                <hr className="my-3" style={{borderColor: C.border}} />
                <p className="mb-6 text-sm" style={{color: C.muted}}>Revisa y elimina publicaciones inapropiadas de la plataforma</p>

                {/* métricas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        {label:'Total mostradas', value: publicacionesAdmin.length, ibg:'rgba(26,58,92,0.1)', ic:<FaBook style={{color:C.primary,fontSize:18}} />, vc: C.primary},
                        {label:'Disponibles',     value: disponibles,               ibg:'#dcfce7', ic:<FaBook className="text-green-600" style={{fontSize:18}} />, vc:'#16a34a'},
                        {label:'Vendidos',        value: vendidos,                  ibg:'#fee2e2', ic:<FaBook className="text-red-500" style={{fontSize:18}} />,   vc:'#dc2626'},
                    ].map(({label, value, ibg, ic, vc}) => (
                        <div key={label} className="rounded-xl p-5 flex items-center gap-4 shadow-sm"
                            style={{background:'#fff', border:`1px solid ${C.border}`}}>
                            <div className="p-3 rounded-full flex-shrink-0" style={{background: ibg}}>{ic}</div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide" style={{color: C.muted}}>{label}</p>
                                <p className="text-3xl font-bold mt-0.5" style={{color: vc}}>{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* filtros */}
                <form onSubmit={handleBuscar} className="rounded-xl p-5 mb-6 shadow-sm"
                    style={{background:'#fff', border:`1px solid ${C.border}`}}>
                    <div className="flex items-center gap-2 mb-4 text-sm font-semibold" style={{color: C.primary}}>
                        <MdFilterList className="text-lg" style={{color: C.accent}} /> Filtros
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{color: C.muted}}>
                                Título
                            </label>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{color: C.muted}} />
                                <input
                                    type="text" name="titulo" value={filtros.titulo}
                                    onChange={handleChange} placeholder="Buscar por título..."
                                    style={{...inputStyle, paddingLeft:32}}
                                    onFocus={focusIn} onBlur={focusOut}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{color: C.muted}}>
                                Categoría
                            </label>
                            <select name="categoria" value={filtros.categoria} onChange={handleChange}
                                style={inputStyle} onFocus={focusIn} onBlur={focusOut}>
                                <option value="">Todas</option>
                                {CATEGORIAS.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{color: C.muted}}>
                                Estado
                            </label>
                            <select name="estado" value={filtros.estado} onChange={handleChange}
                                style={inputStyle} onFocus={focusIn} onBlur={focusOut}>
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
                            className="flex items-center gap-2 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60"
                            style={{background: C.primary}}
                            onMouseOver={e => !loadingAdmin && (e.currentTarget.style.background='#0f2540')}
                            onMouseOut={e => e.currentTarget.style.background=C.primary}
                        >
                            <FaSearch /> Filtrar
                        </button>
                        {hayFiltros && (
                            <button
                                type="button" onClick={handleLimpiar}
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

                {/* tabla */}
                {loadingAdmin ? (
                    <div className="flex justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent"
                            style={{borderColor:`${C.primary} ${C.border} ${C.border}`}} />
                    </div>
                ) : publicacionesAdmin.length === 0 ? (
                    <div className="flex flex-col items-center py-16">
                        <FaBook className="text-6xl mb-4" style={{color: C.border}} />
                        <p className="font-semibold" style={{color: C.muted}}>No hay publicaciones con esos filtros</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl shadow-sm" style={{border:`1px solid ${C.border}`}}>
                        <table className="w-full table-auto bg-white rounded-xl overflow-hidden">
                            <thead>
                                <tr style={{background: C.primary}}>
                                    {['N°','Imagen','Título','Categoría','Precio','Estado','Vendedor','Acción'].map(h => (
                                        <th key={h} className="p-3 text-left text-xs font-semibold uppercase tracking-wide text-white">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {publicacionesAdmin.map((pub, index) => (
                                    <tr key={pub._id} className="border-b transition-colors hover:bg-blue-50/30"
                                        style={{borderColor: C.border}}>

                                        <td className="p-3 text-sm" style={{color: C.muted}}>{index + 1}</td>

                                        <td className="p-3">
                                            {pub.imagen ? (
                                                <img src={pub.imagen} alt={pub.titulo}
                                                    className="h-11 w-11 object-cover rounded-lg"
                                                    style={{border:`1px solid ${C.border}`}} />
                                            ) : (
                                                <div className="h-11 w-11 rounded-lg flex items-center justify-center"
                                                    style={{background: C.bg}}>
                                                    <FaBook style={{color: C.border}} />
                                                </div>
                                            )}
                                        </td>

                                        <td className="p-3 max-w-xs">
                                            <p className="truncate max-w-[180px] font-semibold text-sm" style={{color: C.primary}}>
                                                {pub.titulo}
                                            </p>
                                            <p className="text-xs truncate max-w-[180px]" style={{color: C.muted}}>
                                                {pub.descripcion}
                                            </p>
                                        </td>

                                        <td className="p-3 text-sm" style={{color: C.muted}}>{pub.categoria}</td>

                                        <td className="p-3 font-bold text-green-700 whitespace-nowrap text-sm">
                                            ${Number(pub.precio).toFixed(2)}
                                        </td>

                                        <td className="p-3">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                pub.estado === "disponible"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>
                                                {pub.estado}
                                            </span>
                                        </td>

                                        <td className="p-3 text-sm" style={{color: C.muted}}>
                                            <p className="font-semibold" style={{color:'#334155'}}>{pub.usuario?.nombre ?? "—"}</p>
                                            <p className="text-xs">{pub.usuario?.email ?? ""}</p>
                                        </td>

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

                        <p className="text-xs px-4 py-2 text-right" style={{color:'#94a3b8'}}>
                            {publicacionesAdmin.length} publicación{publicacionesAdmin.length !== 1 ? "es" : ""} mostrada{publicacionesAdmin.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminPublicaciones