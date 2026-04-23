import { Link, Outlet, useLocation } from 'react-router'
import storeAuth from '../context/storeAuth'


const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname

    // Datos del store global
    const { clearToken, usuario, rol } = storeAuth()

    return (
        <div className='md:flex md:min-h-screen'>

            {/* ── Menú lateral ─────────────────────────────────────────── */}
            <div className='md:w-1/5 bg-gray-800 px-5 py-4'>

                <h2 className='text-4xl font-black text-center text-slate-200'>UniBooks</h2>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/2138/2138508.png"
                    alt="avatar"
                    className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full"
                    width={120} height={120}
                />

                {/* Nombre del usuario logueado */}
                <p className='text-slate-400 text-center my-2 text-sm'>
                    <span className='bg-green-600 w-3 h-3 inline-block rounded-full mr-1'></span>
                    {usuario?.nombre ?? 'Usuario'}
                </p>

                {/* Rol */}
                <p className='text-slate-400 text-center text-xs mb-2 capitalize'>
                    {rol ?? ''}
                </p>

                <hr className="mt-3 border-slate-500" />

                {/* Links de navegación */}
                <ul className="mt-5">

                    <li className="text-center">
                        <Link to='/dashboard'
                            className={`${urlActual === '/dashboard'
                                ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md'
                                : 'text-slate-600'} text-xl block mt-2 hover:text-slate-400`}>
                            Dashboard
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/profile'
                            className={`${urlActual === '/dashboard/profile'
                                ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md'
                                : 'text-slate-600'} text-xl block mt-2 hover:text-slate-400`}>
                            Perfil
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/list'
                            className={`${urlActual === '/dashboard/list'
                                ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md'
                                : 'text-slate-600'} text-xl block mt-2 hover:text-slate-400`}>
                            Listar
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/create'
                            className={`${urlActual === '/dashboard/create'
                                ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md'
                                : 'text-slate-600'} text-xl block mt-2 hover:text-slate-400`}>
                            Crear
                        </Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/chat'
                            className={`${urlActual === '/dashboard/chat'
                                ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md'
                                : 'text-slate-600'} text-xl block mt-2 hover:text-slate-400`}>
                            Chat
                        </Link>
                    </li>

                </ul>
            </div>


            {/* ── Contenido principal ───────────────────────────────────── */}
            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>

                {/* Barra superior */}
                <div className='bg-gray-800 py-2 flex md:justify-end items-center gap-5 justify-center'>

                    {/* Nombre visible en la barra */}
                    <div className='text-md font-semibold text-slate-100'>
                        {usuario?.nombre ?? 'Usuario'}
                    </div>

                    <div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                            alt="avatar"
                            className="border-2 border-green-600 rounded-full"
                            width={50} height={50}
                        />
                    </div>

                    {/* Botón salir — limpia el store y redirige al home */}
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
                <div className='overflow-y-scroll p-8'>
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