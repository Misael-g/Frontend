import { Link } from 'react-router'
import { FaBookOpen } from 'react-icons/fa'

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f0f2f5' }

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6"
            style={{background: C.bg}}>

            {/* Ícono libro */}
            <div className="flex items-center justify-center rounded-full mb-8"
                style={{
                    width: 160, height: 160,
                    background: '#fff',
                    border: `3px solid ${C.border}`,
                    boxShadow: '0 8px 32px rgba(26,58,92,0.10)',
                }}>
                <FaBookOpen style={{fontSize:'5rem', color: C.primary, opacity: 0.25}} />
            </div>

            <div className="flex flex-col items-center text-center">

                <p className="font-black text-8xl mb-2" style={{color: C.primary, opacity:0.15}}>
                    404
                </p>

                <h1 className="font-black text-2xl md:text-3xl mb-3"
                    style={{color: C.primary, fontFamily:'Georgia, serif'}}>
                    Página no encontrada
                </h1>

                <p className="text-base mb-8" style={{color: C.muted}}>
                    Lo sentimos, la página que buscas no existe o fue movida.
                </p>

                <Link
                    to="/"
                    className="px-8 py-3 rounded-xl text-white font-semibold text-sm transition-all"
                    style={{background: C.primary}}
                    onMouseOver={e => { e.currentTarget.style.background = '#0f2540'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseOut={e =>  { e.currentTarget.style.background = C.primary;  e.currentTarget.style.transform = 'none' }}
                >
                    Regresar al inicio
                </Link>

            </div>
        </div>
    )
}