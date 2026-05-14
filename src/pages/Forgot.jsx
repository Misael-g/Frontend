import { FaBookOpen } from "react-icons/fa"
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { useFetch } from '../hooks/useFetch'
import { reglasRecuperarPassword } from "../utils/validaciones"


export const Forgot = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const fetchDataBackend = useFetch()

    const sendMail = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpassword`
        const response = await fetchDataBackend(url, dataForm, 'POST')
        if (response) reset()
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
                        Te enviaremos un enlace a tu correo para que puedas restablecer tu contraseña de forma segura.
                    </p>
                </div>

                {/* Formulario */}
                <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center px-6">
                    <div className="w-full max-w-sm">

                        <h3 className="unib-display text-2xl font-bold mb-1" style={{color:'var(--primary)'}}>
                            ¿Olvidaste tu contraseña?
                        </h3>
                        <p className="unib-body text-sm mb-7" style={{color:'var(--text-muted)'}}>
                            No te preocupes, ingresa tu correo y te enviaremos instrucciones para recuperarla.
                        </p>

                        <form onSubmit={handleSubmit(sendMail)} noValidate>

                            {/* Correo */}
                            <div className="mb-5">
                                <label className="unib-body block text-sm font-semibold mb-1.5"
                                    style={{color:'var(--primary)'}}>
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    placeholder="Ingresa un correo electrónico válido"
                                    className={`input-field${errors.email ? ' input-error' : ''}`}
                                    {...register("email", reglasRecuperarPassword.email)}
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <button type="submit" className="btn-primary">
                                Enviar correo
                            </button>

                        </form>

                        <div className="unib-body mt-6 pt-5 border-t flex justify-between items-center text-sm"
                            style={{borderColor:'var(--border)'}}>
                            <p style={{color:'var(--text-muted)'}}>¿Ya posees una cuenta?</p>
                            <Link to="/login"
                                className="py-2 px-5 rounded-lg font-semibold text-sm"
                                style={{background:'var(--primary)', color:'#fff'}}>
                                Iniciar sesión
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}