import { Link, useParams } from 'react-router'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { FaBookOpen, FaCheckCircle } from 'react-icons/fa'
import { useFetch } from '../hooks/useFetch'


export const Confirm = () => {

    const fetchDataBackend = useFetch()

    // Capturar el token de la URL: /confirm/:token
    const { token } = useParams()

    // Función para confirmar el token con el backend
    const verifyToken = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`
        await fetchDataBackend(url)  // GET por defecto
    }

    // Ejecutar una sola vez al montar el componente
    useEffect(() => {
        verifyToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
                :root {
                    --primary: #1a3a5c;
                    --accent: #e8a020;
                    --border: #d4c9b0;
                    --text-muted: #5a6a7a;
                    --light-bg: #f5f0e8;
                }
                .unib-display { font-family: 'Playfair Display', serif; }
                .unib-body   { font-family: 'DM Sans', sans-serif; }
                .btn-primary {
                    background: var(--primary);
                    color: #fff;
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 600;
                    border-radius: 8px;
                    padding: 11px 32px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn-primary:hover {
                    background: #0f2540;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 18px rgba(26,58,92,0.25);
                }
            `}</style>

            <ToastContainer />

            <div className="min-h-screen flex flex-col items-center justify-center px-6"
                style={{background:'var(--light-bg)'}}>

                {/* Ícono de confirmación */}
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="relative">
                        <FaBookOpen style={{fontSize:'5rem', color:'var(--primary)'}} />
                        <FaCheckCircle
                            style={{
                                color:'#22c55e',
                                fontSize:'1.8rem',
                                position:'absolute',
                                bottom:'-6px',
                                right:'-10px',
                                background:'white',
                                borderRadius:'50%'
                            }}
                        />
                    </div>
                    <h1 className="unib-display text-3xl font-black text-center"
                        style={{color:'var(--primary)'}}>
                        Uni<span style={{color:'var(--accent)'}}>Books</span>
                    </h1>
                </div>

                {/* Mensaje */}
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center"
                    style={{border:'1.5px solid var(--border)'}}>

                    <h2 className="unib-display text-2xl font-bold mb-3"
                        style={{color:'var(--primary)'}}>
                        ¡Cuenta confirmada!
                    </h2>

                    <p className="unib-body text-base mb-2" style={{color:'var(--text-muted)'}}>
                        Tu cuenta ha sido verificada correctamente.
                    </p>
                    <p className="unib-body text-sm mb-8" style={{color:'var(--text-muted)'}}>
                        Ya puedes iniciar sesión y comenzar a publicar o buscar libros académicos.
                    </p>

                    <Link to="/login" className="btn-primary">
                        Iniciar sesión
                    </Link>

                </div>

            </div>
        </>
    )
}