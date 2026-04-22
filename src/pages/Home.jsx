import { Link } from 'react-router'
import { MdSearch, MdMenuBook, MdManageAccounts, MdVisibility, MdEmail } from "react-icons/md";
import { FaBookOpen, FaExchangeAlt, FaUserGraduate } from "react-icons/fa";
import { FaFacebook, FaSquareInstagram } from "react-icons/fa6";

export const Home = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

                :root {
                    --primary: #1a3a5c;
                    --accent: #e8a020;
                    --light-bg: #f5f0e8;
                    --white: #ffffff;
                    --text-dark: #1a2332;
                    --text-muted: #5a6a7a;
                    --border: #d4c9b0;
                }

                .unib-font-display { font-family: 'Playfair Display', serif; }
                .unib-font-body { font-family: 'DM Sans', sans-serif; }

                .hero-section {
                    background: var(--primary);
                    position: relative;
                    overflow: hidden;
                }
                .hero-section::before {
                    content: '';
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 320px; height: 320px;
                    border-radius: 50%;
                    background: rgba(232,160,32,0.12);
                }
                .hero-section::after {
                    content: '';
                    position: absolute;
                    bottom: -80px; left: -40px;
                    width: 260px; height: 260px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                }

                .btn-accent {
                    background: var(--accent);
                    color: var(--primary);
                    font-weight: 700;
                    font-family: 'DM Sans', sans-serif;
                    transition: all 0.25s;
                }
                .btn-accent:hover {
                    background: #cf8e18;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(232,160,32,0.3);
                }

                .section-divider {
                    position: relative;
                    text-align: center;
                    margin: 48px 0 32px;
                }
                .section-divider::before {
                    content: '';
                    position: absolute;
                    top: 50%; left: 0; right: 0;
                    height: 2px;
                    background: var(--border);
                }
                .section-divider span {
                    position: relative;
                    background: var(--light-bg);
                    padding: 0 20px;
                    font-family: 'Playfair Display', serif;
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: var(--primary);
                }

                .feature-card {
                    background: var(--white);
                    border: 1.5px solid var(--border);
                    border-radius: 12px;
                    padding: 28px 24px;
                    transition: all 0.25s;
                }
                .feature-card:hover {
                    border-color: var(--accent);
                    box-shadow: 0 6px 24px rgba(26,58,92,0.10);
                    transform: translateY(-4px);
                }
                .feature-icon {
                    width: 52px; height: 52px;
                    border-radius: 50%;
                    background: var(--light-bg);
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 16px;
                    color: var(--primary);
                    font-size: 1.5rem;
                }

                .nav-link {
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 500;
                    color: var(--text-muted);
                    transition: color 0.2s;
                    text-decoration: none;
                }
                .nav-link:hover { color: var(--primary); }

                .footer-area {
                    background: var(--primary);
                    color: rgba(255,255,255,0.85);
                }
            `}</style>

            {/* NAVBAR */}
            <header className="unib-font-body bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="unib-font-display text-2xl font-bold" style={{color:'var(--primary)'}}>
                        Uni<span style={{color:'var(--accent)'}}>Books</span>
                    </h1>
                    <nav className="hidden md:flex gap-8">
                        <a href="#hero" className="nav-link">Inicio</a>
                        <a href="#about" className="nav-link">Nosotros</a>
                        <a href="#features" className="nav-link">Funcionalidades</a>
                        <a href="#contact" className="nav-link">Contacto</a>
                    </nav>
                    <div className="flex gap-3">
                        <Link to="/login" className="unib-font-body px-4 py-2 rounded-lg font-medium text-sm"
                            style={{color:'var(--primary)', border:'1.5px solid var(--primary)'}}>
                            Iniciar sesión
                        </Link>
                        <Link to="/register" className="btn-accent px-4 py-2 rounded-lg text-sm">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </header>


            {/* HERO */}
            <section id="hero" className="hero-section text-white py-24 px-6">
                <div className="container mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="max-w-xl">
                        <p className="unib-font-body text-sm font-semibold tracking-widest uppercase mb-4"
                            style={{color:'var(--accent)'}}>
                            Escuela Politécnica Nacional
                        </p>
                        <h2 className="unib-font-display text-4xl md:text-6xl font-black leading-tight mb-6">
                            Compra y vende libros académicos de forma fácil
                        </h2>
                        <p className="unib-font-body text-lg text-blue-100 mb-10 leading-relaxed">
                            Encuentra libros a mejor precio o publica los que ya no usas en pocos pasos.
                        </p>
                        <Link to="/login" className="btn-accent inline-block px-8 py-3 rounded-xl text-base">
                            Explorar libros
                        </Link>
                    </div>

                    {/* Decorative book icon block */}
                    <div className="hidden md:flex flex-col items-center gap-4 opacity-90">
                        <div className="w-48 h-48 rounded-2xl flex items-center justify-center"
                            style={{background:'rgba(255,255,255,0.08)', border:'1.5px solid rgba(255,255,255,0.15)'}}>
                            <FaBookOpen style={{fontSize:'6rem', color:'var(--accent)'}} />
                        </div>
                        <p className="unib-font-body text-blue-200 text-sm text-center">
                            La comunidad politécnica<br />comparte conocimiento
                        </p>
                    </div>
                </div>
            </section>


            {/* ABOUT */}
            <section id="about" className="unib-font-body py-16 px-6" style={{background:'var(--light-bg)'}}>
                <div className="container mx-auto">
                    <div className="section-divider">
                        <span>Sobre el sistema</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-start mt-8">
                        <div className="md:w-1/2">
                            <p className="text-lg leading-relaxed mb-6" style={{color:'var(--text-dark)'}}>
                                Este sistema web está orientado a facilitar la compra y venta de libros académicos
                                de segunda mano mediante una plataforma digital simple, accesible y organizada.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Publicación de libros académicos',
                                    'Búsqueda por título, autor o categoría',
                                    'Gestión de publicaciones',
                                    'Registro y autenticación de usuarios',
                                    'Contacto entre compradores y vendedores',
                                    'Visualización detallada de cada libro',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{background:'var(--accent)'}}></span>
                                        <span style={{color:'var(--text-dark)'}}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-sm italic" style={{color:'var(--text-muted)'}}>
                                Diseñado para optimizar el acceso a recursos educativos y mejorar la interacción entre usuarios.
                            </p>
                        </div>

                        <div className="md:w-1/2 flex justify-center">
                            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                                {[
                                    {icon: <FaUserGraduate />, label:'Comunidad EPN'},
                                    {icon: <FaBookOpen />, label:'Libros académicos'},
                                    {icon: <FaExchangeAlt />, label:'Segunda mano'},
                                    {icon: <MdSearch />, label:'Búsqueda fácil'},
                                ].map((c, i) => (
                                    <div key={i} className="feature-card text-center">
                                        <div className="feature-icon mx-auto">{c.icon}</div>
                                        <p className="text-sm font-semibold" style={{color:'var(--primary)'}}>{c.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* FEATURES */}
            <section id="features" className="unib-font-body py-16 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="section-divider" style={{}}>
                        <span style={{background:'white'}}>Funcionalidades</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {[
                            {
                                icon: <MdMenuBook />,
                                title: 'Publicación rápida',
                                desc: 'Publica tus libros de forma rápida y sencilla con toda la información necesaria.'
                            },
                            {
                                icon: <MdSearch />,
                                title: 'Búsqueda eficiente',
                                desc: 'Sistema de búsqueda por título, autor o categoría para encontrar lo que necesitas.'
                            },
                            {
                                icon: <MdManageAccounts />,
                                title: 'Gestión de publicaciones',
                                desc: 'Administra todas tus publicaciones activas desde tu perfil de usuario.'
                            },
                            {
                                icon: <MdVisibility />,
                                title: 'Información clara',
                                desc: 'Visualización detallada de cada libro: precio, estado, contacto y más.'
                            },
                        ].map((f, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-icon">{f.icon}</div>
                                <h4 className="font-semibold text-base mb-2" style={{color:'var(--primary)'}}>{f.title}</h4>
                                <p className="text-sm leading-relaxed" style={{color:'var(--text-muted)'}}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* CONTACT / FOOTER */}
            <footer id="contact" className="footer-area unib-font-body py-14 px-6 mt-0">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                        <div>
                            <h3 className="unib-font-display text-3xl font-bold mb-2">
                                Uni<span style={{color:'var(--accent)'}}>Books</span>
                            </h3>
                            <p className="text-blue-200 text-sm max-w-xs leading-relaxed mb-4">
                                ¿Tienes dudas o sugerencias? Escríbenos.
                            </p>
                            <div className="flex gap-4 mt-2">
                                <FaFacebook className="text-2xl text-blue-200 hover:text-white cursor-pointer transition-colors" />
                                <FaSquareInstagram className="text-2xl text-blue-200 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold mb-1">
                                <MdEmail className="inline mr-2" style={{color:'var(--accent)'}} />
                                unibooks@epn.edu.ec
                            </p>
                            <p className="text-blue-200 text-sm">Escuela Politécnica Nacional — Quito, Ecuador</p>
                        </div>

                        <div className="w-full md:max-w-sm">
                            <fieldset className="p-4 rounded-lg" style={{border:'1.5px solid rgba(255,255,255,0.15)'}}>
                                <legend className="px-3 py-1 rounded text-sm font-semibold"
                                    style={{background:'var(--accent)', color:'var(--primary)'}}>
                                    Contáctanos
                                </legend>
                                <div className="flex gap-3 mt-2">
                                    <input
                                        type="email"
                                        placeholder="Tu correo electrónico"
                                        className="flex-1 rounded-lg px-3 py-2 text-sm bg-white/10 border border-white/20
                                            text-white placeholder-blue-200 focus:outline-none focus:border-yellow-400"
                                    />
                                    <button className="btn-accent px-4 py-2 rounded-lg text-sm flex-shrink-0">
                                        Enviar
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <hr className="mt-10 border-white/10" />
                    <p className="text-center text-blue-300 text-xs mt-6">
                        © 2025 UniBooks — Escuela Politécnica Nacional
                    </p>
                </div>
            </footer>
        </>
    )
}
