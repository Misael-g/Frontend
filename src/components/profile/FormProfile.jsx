import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import storeProfile from "../../context/storeProfile"

const C = { primary:'#1a3a5c', border:'#e2e8f0', muted:'#64748b' }

const FormProfile = () => {

    const { user, updateProfile } = storeProfile()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    // Pre-llenar el formulario con los datos actuales del usuario
    useEffect(() => {
        if (user) {
            reset({
                nombre:   user?.nombre,
                email:    user?.email,
                telefono: user?.telefono,
                carrera:  user?.carrera ?? '',
            })
        }
    }, [user])

    const updateUser = (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarperfil/${user._id}`
        updateProfile(url, dataForm)
    }

    const fieldCls = "block w-full rounded-lg py-2 px-3 text-sm text-gray-700 outline-none transition-all"
    const fieldStyle = { border:`1.5px solid ${C.border}` }
    const onFocus = e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = '0 0 0 3px rgba(26,58,92,0.08)' }
    const onBlur  = e => { e.target.style.borderColor = C.border;  e.target.style.boxShadow = 'none' }

    return (
        <div className="rounded-xl p-6 shadow-sm" style={{background:'#fff', border:`1px solid ${C.border}`}}>

            <h2 className="font-black text-xl mb-1" style={{color: C.primary}}>Editar información</h2>
            <hr className="my-3" style={{borderColor: C.border}} />

            <form onSubmit={handleSubmit(updateUser)}>
                <ToastContainer />

                {/* Nombre */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>Nombre</label>
                    <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        className={fieldCls}
                        style={fieldStyle}
                        onFocus={onFocus} onBlur={onBlur}
                        {...register("nombre", { required: "El nombre es obligatorio" })}
                    />
                    {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre.message}</p>}
                    {!errors.nombre && <div className="mb-1" />}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        className={fieldCls}
                        style={fieldStyle}
                        onFocus={onFocus} onBlur={onBlur}
                        {...register("email", { required: "El correo es obligatorio" })}
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                    {!errors.email && <div className="mb-1" />}
                </div>

                {/* Teléfono */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>Teléfono</label>
                    <input
                        type="text"
                        inputMode="tel"
                        placeholder="Ingresa tu teléfono"
                        className={fieldCls}
                        style={fieldStyle}
                        onFocus={onFocus} onBlur={onBlur}
                        {...register("telefono", { required: "El teléfono es obligatorio" })}
                    />
                    {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono.message}</p>}
                    {!errors.telefono && <div className="mb-1" />}
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
                        style={fieldStyle}
                        onFocus={onFocus} onBlur={onBlur}
                        {...register("carrera")}
                    />
                </div>

                {/* Botón actualizar */}
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