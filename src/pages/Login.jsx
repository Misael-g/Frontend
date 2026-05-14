import { useState } from "react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FaBookOpen } from "react-icons/fa"
import { Link, useNavigate } from "react-router"
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { useFetch } from '../hooks/useFetch'
import storeAuth from "../context/storeAuth"
import { reglasLogin } from "../utils/validaciones"


const Login = () => {

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const fetchDataBackend = useFetch()

    const { setToken, setRol, setUsuario } = storeAuth()

    const loginUser = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/login`
        const response = await fetchDataBackend(url, dataForm, 'POST')
        if (response) {
            setToken(response.token)
            setRol(response.rol)
            setUsuario({
                _id:      response._id,
                nombre:   response.nombre,
                email:    response.email,
                telefono: response.telefono,
                carrera:  response.carrera,
            })
            navigate('/dashboard')
        }
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
                :root {
                    --primary: #1a3a5c;
                    --accent: #e8a020;
                    --light-bg: #f5f0e8;
                    --border: #d4c9b0;
                    --text-muted: #5a6a7a;
                }
                .unib-display { font-family: 'Playfair Display', serif; }
                .unib-body { font-family: 'DM Sans', sans-serif; }
                .input-field {
                    width: 100%;
                    border: 1.5px solid var(--border);
                    border-radius: 8px;
                    padding: 10px 14px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.9rem;
                    color: #1a2332;
                    background: #fff;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    outline: none;
                }
                .input-field:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px rgba(26,58,92,0.1);
                }
                .input-error {
                    border-color: #dc2626 !important;
                }
                .input-error:focus {
                    border-color: #dc2626 !important;
                    box-shadow: 0 0 0 3px rgba(220,38,38,0.1) !important;
                }
                .btn-primary {
                    background: var(--primary);
                    color: #fff;
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 600;
                    border-radius: 8px;
                    padding: 11px;
                    width: 100%;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: center;
                    display: block;
                    text-decoration: none;
                }
                .btn-primary:hover {
                    background: #0f2540;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 18px rgba(26,58,92,0.25);
                }
                .panel-bg {
                    background: var(--primary);
                    position: relative;
                    overflow: hidden;
                }
                .panel-bg::before {
                    content: '';
                    position: absolute;
                    top: -80px; right: -80px;
                    width: 300px; height: 300px;
                    border-radius: 50%;
                    background: rgba(232,160,32,0.15);
                }
                .panel-bg::after {
                    content: '';
                    position: absolute;
                    bottom: -60px; left: -60px;
                    width: 240px; height: 240px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                }
            `}</style>

            <ToastContainer />

            <div className="flex flex-col sm:flex-row h-screen">

                {/* Panel lateral */}
                <div className="panel-bg hidden sm:flex sm:w-1/2 flex-col items-center justify-center text-white p-12 relative z-10">
                    <FaBookOpen style={{fontSize:'5rem', color:'var(--accent)', marginBottom:'24px'}} />
                    <h1 className="unib-display text-4xl font-black mb-4 text-center">
                        Uni<span style={{color:'var(--accent)'}}>Books</span>
                    </h1>
                    <p className="unib-body text-blue-100 text-center text-base leading-relaxed max-w-xs">
                        La plataforma de libros académicos de segunda mano para la comunidad de la Escuela Politécnica Nacional.
                    </p>
                    <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
                        {[
                            'Publicación sencilla de libros',
                            'Búsqueda por título o autor',
                            'Contacto directo entre usuarios',
                        ].map((t, i) => (
                            <div key={i} className="unib-body flex items-center gap-3 text-sm text-blue-100">
                                <span className="w-2 h-2 rounded-full flex-shrink-0"
                                    style={{background:'var(--accent)'}}></span>
                                {t}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Formulario */}
                <div className="w-full sm:w-1/2 flex justify-center items-center bg-white px-6">
                    <div className="w-full max-w-sm">

                        <h2 className="unib-display text-3xl font-black text-center mb-1 sm:hidden"
                            style={{color:'var(--primary)'}}>
                            Uni<span style={{color:'var(--accent)'}}>Books</span>
                        </h2>

                        <h3 className="unib-display text-2xl font-bold mb-1" style={{color:'var(--primary)'}}>
                            Bienvenido(a)
                        </h3>
                        <p className="unib-body text-sm mb-7" style={{color:'var(--text-muted)'}}>
                            Por favor ingresa tus datos para continuar
                        </p>

                        <form onSubmit={handleSubmit(loginUser)} noValidate>

                            {/* Correo */}
                            <div className="mb-4">
                                <label className="unib-body block text-sm font-semibold mb-1.5"
                                    style={{color:'var(--primary)'}}>
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    placeholder="Ingresa tu correo electrónico"
                                    className={`input-field${errors.email ? ' input-error' : ''}`}
                                    {...register("email", reglasLogin.email)}
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Contraseña */}
                            <div className="mb-2">
                                <label className="unib-body block text-sm font-semibold mb-1.5"
                                    style={{color:'var(--primary)'}}>
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        className={`input-field pr-10${errors.password ? ' input-error' : ''}`}
                                        {...register("password", reglasLogin.password)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center"
                                        style={{color:'var(--text-muted)'}}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Olvidaste contraseña */}
                            <div className="mb-6 text-right">
                                <Link to="/forgot/id"
                                    className="unib-body text-xs"
                                    style={{color:'var(--text-muted)'}}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <button type="submit" className="btn-primary">
                                Iniciar sesión
                            </button>

                        </form>

                        <div className="unib-body mt-6 pt-5 border-t flex justify-between items-center text-sm"
                            style={{borderColor:'var(--border)'}}>
                            <Link to="/" style={{color:'var(--text-muted)'}}>
                                ← Regresar
                            </Link>
                            <Link to="/register"
                                className="py-2 px-5 rounded-lg font-semibold text-sm border"
                                style={{color:'var(--primary)', borderColor:'var(--primary)'}}>
                                Registrarse
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Login