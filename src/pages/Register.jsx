import { useState } from "react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FaBookOpen } from "react-icons/fa"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import { useFetch } from "../hooks/useFetch"

export const Register = () => {

    const [showPassword, setShowPassword] = useState(false)
    const fetchDataBackend = useFetch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const registerUser = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
        const response = await fetchDataBackend(url, dataForm, "POST")
        if (response) reset()
    }

    return (
        <>
            <ToastContainer />

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
                    padding: 9px 14px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.875rem;
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
            `}</style>

            <div className="flex flex-col sm:flex-row min-h-screen">

                {/* Formulario */}
                <div className="w-full sm:w-1/2 bg-white flex justify-center items-center px-6 py-10">
                    <div className="w-full max-w-sm">

                        <h3 className="unib-display text-2xl font-bold mb-1" style={{color:'var(--primary)'}}>
                            Crear cuenta
                        </h3>
                        <p className="unib-body text-sm mb-6" style={{color:'var(--text-muted)'}}>
                            Por favor ingresa tus datos para registrarte
                        </p>

                        <form onSubmit={handleSubmit(registerUser)}>

                            {/* Nombre */}
                            <div className="mb-3">
                                <label className="unib-body block text-sm font-semibold mb-1.5"
                                    style={{color:'var(--primary)'}}>
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    className={`input-field ${errors.nombre ? 'input-error' : ''}`}
                                    {...register("nombre", { required: "El nombre es obligatorio" })}
                                />
                                {errors.nombre && (
                                    <p className="text-red-600 text-xs mt-1">{errors.nombre.message}</p>
                                )}
                            </div>

                            {/* Teléfono */}
                            <div className="mb-3">
                                <label className="unib-body block text-sm font-semibold mb-1.5"
                                    style={{color:'var(--primary)'}}>
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    inputMode="tel"
                                    placeholder="Ingresa tu teléfono"
                                    className={`input-field ${errors.telefono ? 'input-error' : ''}`}
                                    {...register("telefono", { required: "El teléfono es obligatorio" })}
                                />
                                {errors.telefono && (
                                    <p className="text-red-600 text-xs mt-1">{errors.telefono.message}</p>
                                )}
                            </div>

                            {/* Carrera (opcional) */}
                            <div className="mb-3">
                                <label className="unib-body block text-sm font-semibold mb-1.5"
                                    style={{color:'var(--primary)'}}>
                                    Carrera <span className="font-normal" style={{color:'var(--text-muted)'}}>(opcional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej: Ingeniería en Sistemas"
                                    className="input-field"
                                    {...register("carrera")}
                                />
                            </div>

                            {/* Correo */}
                            <div className="mb-3">
                                <label className="unib-body block text-sm font-semibold mb-1.5"
                                    style={{color:'var(--primary)'}}>
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    placeholder="Ingresa tu correo electrónico"
                                    className={`input-field ${errors.email ? 'input-error' : ''}`}
                                    {...register("email", { required: "El correo electrónico es obligatorio" })}
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Contraseña */}
                            <div className="mb-5">
                                <label className="unib-body block text-sm font-semibold mb-1.5"
                                    style={{color:'var(--primary)'}}>
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        className={`input-field pr-10 ${errors.password ? 'input-error' : ''}`}
                                        {...register("password", { required: "La contraseña es obligatoria" })}
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

                            <button type="submit" className="btn-primary">
                                Registrarse
                            </button>

                        </form>

                        <div className="unib-body mt-5 flex justify-between items-center text-sm">
                            <p style={{color:'var(--text-muted)'}}>¿Ya posees una cuenta?</p>
                            <Link to="/login"
                                className="py-2 px-5 rounded-lg font-semibold text-sm border"
                                style={{color:'var(--primary)', borderColor:'var(--primary)'}}>
                                Iniciar sesión
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Panel lateral decorativo */}
                <div className="panel-bg hidden sm:flex sm:w-1/2 flex-col items-center justify-center text-white p-12 relative z-10">
                    <FaBookOpen style={{fontSize:'5rem', color:'var(--accent)', marginBottom:'24px'}} />
                    <h1 className="unib-display text-4xl font-black mb-4 text-center">
                        Uni<span style={{color:'var(--accent)'}}>Books</span>
                    </h1>
                    <p className="unib-body text-blue-100 text-center text-base leading-relaxed max-w-xs">
                        Únete a la comunidad de la Escuela Politécnica Nacional y encuentra libros académicos al mejor precio.
                    </p>
                    <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
                        {[
                            'Registro rápido y gratuito',
                            'Publica libros en pocos pasos',
                            'Conecta con otros estudiantes',
                        ].map((t, i) => (
                            <div key={i} className="unib-body flex items-center gap-3 text-sm text-blue-100">
                                <span className="w-2 h-2 rounded-full flex-shrink-0"
                                    style={{background:'var(--accent)'}}></span>
                                {t}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}