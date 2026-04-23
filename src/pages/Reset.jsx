import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { FaBookOpen, FaLock } from 'react-icons/fa'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { useFetch } from '../hooks/useFetch'


const Reset = () => {

    const navigate = useNavigate()
    const { token } = useParams()
    const fetchDataBackend = useFetch()

    // Controla si el token es válido para mostrar el formulario
    const [tokenValido, setTokenValido] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()

    // Al montar: verificar que el token del link sea válido
    useEffect(() => {
        const verifyToken = async () => {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpassword/${token}`
            await fetchDataBackend(url)   // GET por defecto
            setTokenValido(true)
        }
        verifyToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Enviar nueva contraseña al backend
    const changePassword = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/nuevopassword/${token}`
        const response = await fetchDataBackend(url, dataForm, 'POST')
        // Si la respuesta es exitosa, redirigir al login luego de 2 segundos
        if (response) {
            setTimeout(() => navigate('/login'), 2000)
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
                .unib-body   { font-family: 'DM Sans', sans-serif; }
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
                .panel-bg::after {
                    content: '';
                    position: absolute;
                    bottom: -60px; left: -60px;
                    width: 200px; height: 200px;
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
                        Crea una nueva contraseña segura para proteger tu cuenta.
                    </p>
                </div>

                {/* Formulario */}
                <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center px-6">
                    <div className="w-full max-w-sm">

                        {/* Ícono */}
                        <div className="flex justify-center mb-5">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{background:'var(--light-bg)'}}>
                                <FaLock style={{fontSize:'1.8rem', color:'var(--primary)'}} />
                            </div>
                        </div>

                        <h3 className="unib-display text-2xl font-bold mb-1 text-center"
                            style={{color:'var(--primary)'}}>
                            Nueva contraseña
                        </h3>
                        <p className="unib-body text-sm mb-7 text-center" style={{color:'var(--text-muted)'}}>
                            Ingresa y confirma tu nueva contraseña
                        </p>

                        {/* El formulario solo se muestra si el token es válido */}
                        {tokenValido && (
                            <form onSubmit={handleSubmit(changePassword)}>

                                {/* Nueva contraseña */}
                                <div className="mb-4">
                                    <label className="unib-body block text-sm font-semibold mb-1.5"
                                        style={{color:'var(--primary)'}}>
                                        Nueva contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Ingresa tu nueva contraseña"
                                            className="input-field pr-10"
                                            {...register("password", { required: "La contraseña es obligatoria" })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center"
                                            style={{color:'var(--text-muted)'}}
                                        >
                                            {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* Confirmar contraseña */}
                                <div className="mb-6">
                                    <label className="unib-body block text-sm font-semibold mb-1.5"
                                        style={{color:'var(--primary)'}}>
                                        Confirmar contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            placeholder="Repite tu contraseña"
                                            className="input-field pr-10"
                                            {...register("confirmpassword", { required: "Debes confirmar la contraseña" })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute inset-y-0 right-3 flex items-center"
                                            style={{color:'var(--text-muted)'}}
                                        >
                                            {showConfirm ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                        </button>
                                    </div>
                                    {errors.confirmpassword && (
                                        <p className="text-red-600 text-xs mt-1">{errors.confirmpassword.message}</p>
                                    )}
                                </div>

                                <button type="submit" className="btn-primary">
                                    Guardar nueva contraseña
                                </button>

                            </form>
                        )}

                        {/* Mientras se verifica el token */}
                        {!tokenValido && (
                            <p className="unib-body text-center text-sm" style={{color:'var(--text-muted)'}}>
                                Verificando enlace...
                            </p>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}

export default Reset