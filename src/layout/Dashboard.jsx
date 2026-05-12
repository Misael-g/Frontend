import { Link, Outlet, useLocation } from 'react-router'
import storeAuth from '../context/storeAuth'
import storeProfile from '../context/storeProfile'


const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname

    const { clearToken } = storeAuth()
    const { user } = storeProfile()

    const isAdmin = user?.rol === "admin"

    const linkClass = (path) =>
        `${urlActual === path
            ? 'text-white bg-[#1a3a5c] font-semibold'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        } text-sm block mt-1 px-3 py-2 rounded-lg transition-all duration-200 text-center`

    return (
        <div className='md:flex md:min-h-screen'>

            {/* ── Menú lateral ── */}
            <div className='md:w-1/5 px-4 py-5 flex flex-col' style={{background:'#0f2030'}}>

                {/* Logo */}
                <div className='text-center mb-6'>
                    <h2 className='text-2xl font-black text-white' style={{fontFamily:'Georgia, serif'}}>
                        Uni<span style={{color:'#e8a020'}}>Books</span>
                    </h2>
                </div>

                {/* Avatar + usuario */}
                <div className='flex flex-col items-center mb-5 pb-5'
                    style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
                    <div className='w-16 h-16 rounded-full flex items-center justify-center mb-3'
                        style={{background:'#1a3a5c', border:'2px solid #e8a020'}}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/207/207114.png"
                            alt="avatar"
                            className="w-10 h-10 object-contain opacity-90"
                        />
                    </div>
                    <p className='text-white text-sm font-semibold text-center'>{user?.nombre}</p>
                    <span className='text-xs px-2 py-0.5 rounded-full mt-1 capitalize font-medium'
                        style={{
                            background: isAdmin ? '#e8a020' : 'rgba(255,255,255,0.1)',
                            color:      isAdmin ? '#0f2030' : '#94a3b8',
                        }}>
                        {user?.rol}
                    </span>
                </div>

                {/* Nav links — todos centrados */}
                <ul className="flex-1">
                    <li>
                        <Link to='/dashboard' className={linkClass('/dashboard')}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard/profile' className={linkClass('/dashboard/profile')}>
                            Perfil
                        </Link>
                    </li>

                    {!isAdmin && (
                        <>
                            <li>
                                <Link to='/dashboard/list' className={linkClass('/dashboard/list')}>
                                    Libros
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/buscar' className={linkClass('/dashboard/buscar')}>
                                    Buscar
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/mis-publicaciones' className={linkClass('/dashboard/mis-publicaciones')}>
                                    Mis libros
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/create' className={linkClass('/dashboard/create')}>
                                    Publicar
                                </Link>
                            </li>
                            {/* Chat eliminado */}
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <div className='mt-4 mb-2 px-3 text-center'>
                                <p className="text-xs uppercase tracking-widest font-semibold"
                                    style={{color:'#e8a020'}}>
                                    Administración
                                </p>
                            </div>
                            <li>
                                <Link to='/dashboard/admin/usuarios' className={linkClass('/dashboard/admin/usuarios')}>
                                    Usuarios
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/admin/publicaciones' className={linkClass('/dashboard/admin/publicaciones')}>
                                    Publicaciones
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>


            {/* ── Contenido principal ── */}
            <div className='flex-1 flex flex-col h-screen' style={{background:'#f0f2f5'}}>

                {/* Barra superior */}
                <div className='py-2.5 px-5 flex md:justify-end items-center gap-4 justify-center shadow-sm'
                    style={{background:'#1a3a5c'}}>
                    <div className='text-sm font-semibold text-slate-100 flex items-center gap-2'>
                        {isAdmin && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                                style={{background:'#e8a020', color:'#0f2030'}}>
                                Admin
                            </span>
                        )}
                        {user?.nombre}
                    </div>
                    <div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/207/207114.png"
                            alt="avatar"
                            className="rounded-full object-contain bg-white/10 p-1"
                            width={38} height={38}
                        />
                    </div>
                    <div>
                        <Link
                            to='/'
                            onClick={() => clearToken()}
                            className="text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
                            style={{background:'#c0392b'}}
                            onMouseOver={e => e.currentTarget.style.background='#96281b'}
                            onMouseOut={e =>  e.currentTarget.style.background='#c0392b'}
                        >
                            Salir
                        </Link>
                    </div>
                </div>

                {/* Páginas internas */}
                <div className='overflow-y-auto p-6 flex-1'>
                    <Outlet />
                </div>

                {/* Footer */}
                <div className='py-3 text-center text-xs font-medium'
                    style={{background:'#1a3a5c', color:'rgba(255,255,255,0.6)'}}>
                    © 2025 UniBooks — Escuela Politécnica Nacional
                </div>

            </div>

        </div>
    )
}

export default Dashboard