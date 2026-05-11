import { useEffect } from "react"
import { Link } from "react-router"
import { FaBook, FaCheckCircle, FaTimesCircle, FaPlus, FaUsers, FaShieldAlt } from "react-icons/fa"
import PropTypes from "prop-types"
import { MdBarChart, MdManageAccounts, MdMenuBook } from "react-icons/md"
import storePublicaciones from "../context/storePublicaciones"
import storeAdmin from "../context/storeAdmin"
import storeProfile from "../context/storeProfile"


// ── Colores compartidos ──────────────────────────────────
const C = {
    primary: '#1a3a5c',
    accent:  '#e8a020',
    bg:      '#f0f2f5',
    white:   '#ffffff',
    border:  '#e2e8f0',
    muted:   '#64748b',
}

// ── Tarjeta de métrica ───────────────────────────────────
const MetricCard = ({ label, value, icon, iconBg, valueColor }) => (
    <div className="rounded-xl p-5 flex items-center gap-4 shadow-sm transition-shadow hover:shadow-md"
        style={{background: C.white, border: `1px solid ${C.border}`}}>
        <div className="p-3 rounded-full flex-shrink-0" style={{background: iconBg}}>
            {icon}
        </div>
        <div>
            <p className="text-xs font-medium uppercase tracking-wide" style={{color: C.muted}}>{label}</p>
            <p className="text-3xl font-bold mt-0.5" style={{color: valueColor ?? C.primary}}>{value}</p>
        </div>
    </div>
)


const PanelAdmin = ({ user }) => {
    const { usuarios, publicacionesAdmin, listarUsuarios, listarTodasPublicaciones } = storeAdmin()

    useEffect(() => {
        listarUsuarios()
        listarTodasPublicaciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const activos      = usuarios.filter(u => u.status).length
    const inactivos    = usuarios.filter(u => !u.status).length
    const disponibles  = publicacionesAdmin.filter(p => p.estado === "disponible").length
    const vendidos     = publicacionesAdmin.filter(p => p.estado === "vendido").length

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="mb-6">
                <h1 className="font-black text-2xl" style={{color: C.primary}}>
                    Bienvenido, {user?.nombre ?? "admin"} 👋
                </h1>
                <p className="text-sm mt-1" style={{color: C.muted}}>Panel de administración de UniBooks</p>
                <hr className="my-4" style={{borderColor: C.border}} />
            </div>

            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
                <FaUsers /> Usuarios registrados
            </p>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                        <FaUsers className="text-gray-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total usuarios</p>
                        <p className="text-3xl font-bold text-gray-800">{usuarios.length}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaCheckCircle className="text-green-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Activos</p>
                        <p className="text-3xl font-bold text-green-700">{activos}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <FaTimesCircle className="text-red-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Inactivos</p>
                        <p className="text-3xl font-bold text-red-600">{inactivos}</p>
                    </div>
                </div>

            </section>

            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
                <MdMenuBook className="text-base" /> Publicaciones en la plataforma
            </p>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                        <FaBook className="text-gray-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total publicaciones</p>
                        <p className="text-3xl font-bold text-gray-800">{publicacionesAdmin.length}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaCheckCircle className="text-green-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Disponibles</p>
                        <p className="text-3xl font-bold text-green-700">{disponibles}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <FaTimesCircle className="text-red-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Vendidos</p>
                        <p className="text-3xl font-bold text-red-600">{vendidos}</p>
                    </div>
                </div>

            </section>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold mb-4 flex items-center gap-2" style={{color: C.primary}}>
                    <MdManageAccounts className="text-xl" style={{color: C.accent}} /> Acciones rápidas
                </h2>
                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/dashboard/admin/usuarios"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                        style={{background: C.primary}}
                        onMouseOver={e => e.currentTarget.style.background='#0f2540'}
                        onMouseOut={e => e.currentTarget.style.background=C.primary}
                    >
                        <FaUsers /> Gestionar usuarios
                    </Link>
                    <Link
                        to="/dashboard/admin/publicaciones"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        style={{border:`1.5px solid ${C.primary}`, color: C.primary}}
                        onMouseOver={e => e.currentTarget.style.background='#f0f4f8'}
                        onMouseOut={e => e.currentTarget.style.background='transparent'}
                    >
                        <FaBook /> Moderar publicaciones
                    </Link>
                </div>
            </div>

        </div>
    )
}

PanelAdmin.propTypes = {
    user: PropTypes.shape({
        nombre: PropTypes.string,
        rol: PropTypes.string,
    }),
}

const PanelUsuario = ({ user }) => {
    const { misPublicaciones, cargarMisPublicaciones } = storePublicaciones()

    useEffect(() => {
        cargarMisPublicaciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const total       = misPublicaciones.length
    const disponibles = misPublicaciones.filter(p => p.estado === "disponible").length
    const vendidos    = misPublicaciones.filter(p => p.estado === "vendido").length
    const recientes   = [...misPublicaciones]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)

    const formatFecha = (iso) =>
        new Date(iso).toLocaleDateString("es-EC", { day: "2-digit", month: "short", year: "numeric" })

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="mb-6">
                <h1 className="font-black text-2xl" style={{color: C.primary}}>
                    Bienvenido, {user?.nombre ?? "usuario"} 👋
                </h1>
                <p className="text-sm mt-1" style={{color: C.muted}}>Aquí tienes un resumen de tus publicaciones</p>
                <hr className="my-4" style={{borderColor: C.border}} />
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

                <MetricCard
                    label="Total publicaciones"
                    value={total}
                    icon={<FaBook className="text-xl" style={{color: C.primary}} />}
                    iconBg="rgba(26,58,92,0.1)"
                />
                <MetricCard
                    label="Disponibles"
                    value={disponibles}
                    icon={<FaCheckCircle className="text-xl text-green-600" />}
                    iconBg="#dcfce7"
                    valueColor="#16a34a"
                />
                <MetricCard
                    label="Vendidos"
                    value={vendidos}
                    icon={<FaTimesCircle className="text-xl text-red-500" />}
                    iconBg="#fee2e2"
                    valueColor="#dc2626"
                />

            </section>

            <div className="bg-white rounded-xl shadow p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold flex items-center gap-2" style={{color: C.primary}}>
                        <MdBarChart className="text-xl" style={{color: C.accent}} /> Mis últimas publicaciones
                    </h2>
                    <Link
                        to="/dashboard/mis-publicaciones"
                        className="text-xs font-semibold underline"
                        style={{color: C.accent}}
                    >
                        Ver todas →
                    </Link>
                </div>

                {recientes.length === 0 ? (
                    <div className="text-center py-10">
                        <FaBook className="text-5xl mx-auto mb-3" style={{color: C.border}} />
                        <p className="text-sm mb-4" style={{color: C.muted}}>Aún no tienes publicaciones</p>
                        <Link
                            to="/dashboard/create"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                            style={{background: C.primary}}
                        >
                            <FaPlus /> Crear primera publicación
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-sm">
                            <thead>
                                <tr className="text-left border-b" style={{borderColor: C.border}}>
                                    <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide" style={{color: C.muted}}>Título</th>
                                    <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide" style={{color: C.muted}}>Categoría</th>
                                    <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide" style={{color: C.muted}}>Precio</th>
                                    <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide" style={{color: C.muted}}>Estado</th>
                                    <th className="pb-2 text-xs font-semibold uppercase tracking-wide" style={{color: C.muted}}>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recientes.map((pub) => (
                                    <tr key={pub._id} className="border-b transition-colors hover:bg-blue-50/40"
                                        style={{borderColor: C.border}}>
                                        <td className="py-2.5 pr-4">
                                            <Link
                                                to={`/dashboard/details/${pub._id}`}
                                                className="font-semibold hover:underline truncate block max-w-[150px]"
                                                style={{color: C.primary}}
                                            >
                                                {pub.titulo}
                                            </Link>
                                        </td>
                                        <td className="py-2.5 pr-4 text-xs" style={{color: C.muted}}>
                                            {pub.categoria ?? "—"}
                                        </td>
                                        <td className="py-2.5 pr-4 font-bold whitespace-nowrap text-green-700">
                                            ${Number(pub.precio).toFixed(2)}
                                        </td>
                                        <td className="py-2.5 pr-4">
                                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                                pub.estado === "disponible"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>
                                                {pub.estado}
                                            </span>
                                        </td>
                                        <td className="py-2.5 text-xs whitespace-nowrap" style={{color: C.muted}}>
                                            {formatFecha(pub.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="font-bold mb-4" style={{color: C.primary}}>Acciones rápidas</h2>
                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/dashboard/create"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                        style={{background: C.primary}}
                        onMouseOver={e => e.currentTarget.style.background='#0f2540'}
                        onMouseOut={e => e.currentTarget.style.background=C.primary}
                    >
                        <FaPlus /> Nueva publicación
                    </Link>
                    <Link
                        to="/dashboard/mis-publicaciones"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        style={{border:`1.5px solid ${C.border}`, color: C.primary}}
                        onMouseOver={e => e.currentTarget.style.background='#f0f4f8'}
                        onMouseOut={e => e.currentTarget.style.background='transparent'}
                    >
                        <FaBook /> Gestionar mis libros
                    </Link>
                    <Link
                        to="/dashboard/list"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        style={{border:`1.5px solid ${C.border}`, color: C.muted}}
                        onMouseOver={e => e.currentTarget.style.background='#f0f4f8'}
                        onMouseOut={e => e.currentTarget.style.background='transparent'}
                    >
                        Ver todos los libros
                    </Link>
                </div>
            </div>

        </div>
    )
}

PanelUsuario.propTypes = {
    user: PropTypes.shape({
        nombre: PropTypes.string,
        rol: PropTypes.string,
    }),
}

export default function Panel() {
    const { user } = storeProfile()

    if (!user) return null

    return user.rol === "admin"
        ? <PanelAdmin user={user} />
        : <PanelUsuario user={user} />
}
