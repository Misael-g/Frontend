import { Link, Outlet, useLocation } from 'react-router'
import storeAuth from '../context/storeAuth'
import storeProfile from '../context/storeProfile'


const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname

    const { clearToken } = storeAuth()
    const { user } = storeProfile()

    const isAdmin = user?.rol === "admin"

    // clases activas e inactivas del menu
    const linkClass = (path) =>
        `${urlActual === path
            ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md'
            : 'text-slate-600'} text-xl block mt-2 hover:text-slate-400 transition-colors`

    return (
        <div className='md:flex md:min-h-screen'>

            {/* ── Menú lateral ── */}
            <div className='md:w-1/5 bg-gray-800 px-5 py-4'>

                <h2 className='text-4xl font-black text-center text-slate-200'>UniBooks</h2>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/2138/2138508.png"
                    alt="avatar"
                    className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full"
                    width={120} height={120}
                />

                <p className='text-slate-400 text-center my-2 text-sm'>
                    <span className='bg-green-600 w-3 h-3 inline-block rounded-full mr-1'></span>
                    Bienvenido - {user?.nombre}
                </p>
                <p className='text-slate-400 text-center text-xs mb-2 capitalize'>{user?.rol}</p>

                <hr className="mt-3 border-slate-500" />

                <ul className="mt-5">
                    <li className="text-center">
                        <Link to='/dashboard' className={linkClass('/dashboard')}>
                            Dashboard
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link to='/dashboard/profile' className={linkClass('/dashboard/profile')}>
                            Perfil
                        </Link>
                    </li>
                    {!isAdmin && (
                        <>
                            <li className="text-center">
                                <Link to='/dashboard/list' className={linkClass('/dashboard/list')}>
                                    Libros
                                </Link>
                            </li>
                            <li className="text-center">
                                <Link to='/dashboard/buscar' className={linkClass('/dashboard/buscar')}>
                                    Buscar
                                </Link>
                            </li>
                            <li className="text-center">
                                <Link to='/dashboard/mis-publicaciones' className={linkClass('/dashboard/mis-publicaciones')}>
                                    Mis libros
                                </Link>
                            </li>
                            <li className="text-center">
                                <Link to='/dashboard/create' className={linkClass('/dashboard/create')}>
                                    Publicar
                                </Link>
                            </li>
                            <li className="text-center">
                                <Link to='/dashboard/chat' className={linkClass('/dashboard/chat')}>
                                    Chat
                                </Link>
                            </li>
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <hr className="my-3 border-slate-600" />
                            <p className="text-xs text-slate-500 uppercase tracking-widest px-2 mb-1 text-center">
                                Administración
                            </p>
                            <li className="text-center">
                                <Link to='/dashboard/admin/usuarios' className={linkClass('/dashboard/admin/usuarios')}>
                                    Usuarios
                                </Link>
                            </li>
                            <li className="text-center">
                                <Link to='/dashboard/admin/publicaciones' className={linkClass('/dashboard/admin/publicaciones')}>
                                    Publicaciones
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>


            {/* ── Contenido principal ── */}
            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>

                {/* Barra superior */}
                <div className='bg-gray-800 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100 flex items-center gap-2'>
                        {isAdmin && (
                            <span className="bg-red-700 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                Admin
                            </span>
                        )}
                        {user?.nombre}
                    </div>
                    <div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                            alt="avatar"
                            className="border-2 border-green-600 rounded-full"
                            width={50} height={50}
                        />
                    </div>
                    <div>
                        <Link
                            to='/'
                            onClick={() => clearToken()}
                            className="text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg"
                        >
                            Salir
                        </Link>
                    </div>
                </div>

                {/* Páginas internas */}
                <div className='overflow-y-scroll p-8 flex-1'>
                    <Outlet />
                </div>


                <div className='bg-gray-800 h-12'>
                    <p className='text-center text-slate-100 leading-[2.9rem] underline'>
                        Todos los derechos reservados
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Dashboard