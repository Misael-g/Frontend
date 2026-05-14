import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import storeProfile from "../../context/storeProfile"
import { reglasActualizarPerfil } from "../../utils/validaciones"

const C = { primary:'#1a3a5c', border:'#e2e8f0', muted:'#64748b' }

const FormProfile = () => {

    const { user, updateProfile } = storeProfile()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    useEffect(() => {
        if (user) {
            reset({
                nombre:   user?.nombre,
                email:    user?.email,
                telefono: user?.telefono,
                carrera:  user?.carrera ?? '',
            })
        }
    }, [user, reset])

    const updateUser = (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarperfil/${user._id}`
        updateProfile(url, dataForm)
    }

    const fieldCls = "block w-full rounded-lg py-2 px-3 text-sm text-gray-700 outline-none transition-all"
    const fieldStyle      = { border:`1.5px solid ${C.border}` }
    const fieldStyleError = { border:`1.5px solid #dc2626` }
    const onFocus = e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = '0 0 0 3px rgba(26,58,92,0.08)' }
    const onBlur  = e => { e.target.style.borderColor = C.border;  e.target.style.boxShadow = 'none' }
    const onFocusError = e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.1)' }
    const onBlurError  = e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = 'none' }

    return (
        <div className="rounded-xl p-6 shadow-sm" style={{background:'#fff', border:`1px solid ${C.border}`}}>

            <h2 className="font-black text-xl mb-1" style={{color: C.primary}}>Editar información</h2>
            <hr className="my-3" style={{borderColor: C.border}} />

            <form onSubmit={handleSubmit(updateUser)} noValidate>
                <ToastContainer />

                {/* Nombre */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        className={fieldCls}
                        style={errors.nombre ? fieldStyleError : fieldStyle}
                        onFocus={errors.nombre ? onFocusError : onFocus}
                        onBlur={errors.nombre ? onBlurError : onBlur}
                        {...register("nombre", reglasActualizarPerfil.nombre)}
                    />
                    {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre.message}</p>}
                    {!errors.nombre && <div className="mb-1" />}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        className={fieldCls}
                        style={errors.email ? fieldStyleError : fieldStyle}
                        onFocus={errors.email ? onFocusError : onFocus}
                        onBlur={errors.email ? onBlurError : onBlur}
                        {...register("email", reglasActualizarPerfil.email)}
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                    {!errors.email && <div className="mb-1" />}
                </div>

                {/* Teléfono */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        inputMode="tel"
                        placeholder="09XXXXXXXX"
                        className={fieldCls}
                        style={errors.telefono ? fieldStyleError : fieldStyle}
                        onFocus={errors.telefono ? onFocusError : onFocus}
                        onBlur={errors.telefono ? onBlurError : onBlur}
                        {...register("telefono", reglasActualizarPerfil.telefono)}
                    />
                    {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono.message}</p>}
                    {!errors.telefono && (
                        <p className="text-xs mt-1" style={{color: C.muted}}>
                            Formato: 09XXXXXXXX (10 dígitos)
                        </p>
                    )}
                </div>

                {/* Carrera (opcional) */}
                <div className="mb-5">
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Carrera{' '}
                        <span className="font-normal" style={{color: C.muted}}>(opcional)</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Ingeniería en Sistemas"
                        className={fieldCls}
                        style={errors.carrera ? fieldStyleError : fieldStyle}
                        onFocus={errors.carrera ? onFocusError : onFocus}
                        onBlur={errors.carrera ? onBlurError : onBlur}
                        {...register("carrera", reglasActualizarPerfil.carrera)}
                    />
                    {errors.carrera && <p className="text-red-600 text-xs mt-1">{errors.carrera.message}</p>}
                </div>

                <input
                    type="submit"
                    value="Actualizar perfil"
                    className="w-full py-2.5 rounded-lg text-white font-bold text-sm uppercase cursor-pointer transition-colors mt-2"
                    style={{background: C.primary}}
                    onMouseOver={e => e.target.style.background = '#0f2540'}
                    onMouseOut={e =>  e.target.style.background = C.primary}
                />

            </form>
        </div>
    )
}

export default FormProfile