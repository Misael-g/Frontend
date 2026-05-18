import { useState } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import storeProfile from "../../context/storeProfile"
import storeAuth from "../../context/storeAuth"
import { reglasCambiarPassword } from "../../utils/validaciones"

const C = { primary:'#1a3a5c', border:'#e2e8f0', muted:'#64748b' }

const fieldCls = "block w-full rounded-lg py-2 px-3 text-sm text-gray-700 outline-none transition-all"

const CardPassword = () => {

    const [showActual,  setShowActual]  = useState(false)
    const [showNuevo,   setShowNuevo]   = useState(false)

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
    const { user, updatePasswordProfile } = storeProfile()
    const { clearToken } = storeAuth()

    const passwordNuevoValue = watch("passwordnuevo")

    const updatePassword = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarpassword`
        const response = await updatePasswordProfile(url, dataForm)
        if (response) {
            reset()
            clearToken()
        }
    }

    const fieldStyle      = { border:`1.5px solid ${C.border}` }
    const fieldStyleError = { border:`1.5px solid #dc2626` }
    const onFocus      = e => { e.target.style.borderColor = C.primary;   e.target.style.boxShadow = '0 0 0 3px rgba(26,58,92,0.08)' }
    const onBlur       = e => { e.target.style.borderColor = C.border;    e.target.style.boxShadow = 'none' }
    const onFocusError = e => { e.target.style.borderColor = '#dc2626';   e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.1)' }
    const onBlurError  = e => { e.target.style.borderColor = '#dc2626';   e.target.style.boxShadow = 'none' }

    return (
        <>
            <ToastContainer />

            <div className="mt-5 rounded-xl p-6 shadow-sm"
                style={{background:'#fff', border:`1px solid ${C.border}`}}>

                <h1 className="font-black text-xl mb-1" style={{color: C.primary}}>
                    Actualizar contraseña
                </h1>
                <hr className="my-3" style={{borderColor: C.border}} />

                <form onSubmit={handleSubmit(updatePassword)} noValidate>

                    {/* Contraseña actual */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                            Contraseña actual <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showActual ? "text" : "password"}
                                placeholder="Ingresa tu contraseña actual"
                                className={`${fieldCls} pr-10`}
                                style={errors.passwordactual ? fieldStyleError : fieldStyle}
                                onFocus={errors.passwordactual ? onFocusError : onFocus}
                                onBlur={errors.passwordactual ? onBlurError : onBlur}
                                {...register("passwordactual", reglasCambiarPassword.passwordactual)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowActual(!showActual)}
                                className="absolute inset-y-0 right-3 flex items-center"
                                style={{color: C.muted}}
                                aria-label={showActual ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showActual ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                            </button>
                        </div>
                        {errors.passwordactual && (
                            <p className="text-red-600 text-xs mt-1">{errors.passwordactual.message}</p>
                        )}
                        {!errors.passwordactual && <div className="mb-1" />}
                    </div>

                    {/* Nueva contraseña */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                            Nueva contraseña <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showNuevo ? "text" : "password"}
                                placeholder="Ingresa tu nueva contraseña"
                                className={`${fieldCls} pr-10`}
                                style={errors.passwordnuevo ? fieldStyleError : fieldStyle}
                                onFocus={errors.passwordnuevo ? onFocusError : onFocus}
                                onBlur={errors.passwordnuevo ? onBlurError : onBlur}
                                {...register("passwordnuevo", reglasCambiarPassword.passwordnuevo)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNuevo(!showNuevo)}
                                className="absolute inset-y-0 right-3 flex items-center"
                                style={{color: C.muted}}
                                aria-label={showNuevo ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showNuevo ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                            </button>
                        </div>
                        {errors.passwordnuevo && (
                            <p className="text-red-600 text-xs mt-1">{errors.passwordnuevo.message}</p>
                        )}
                        {!errors.passwordnuevo && (
                            <p className="text-xs mt-1" style={{color: C.muted}}>
                                Mínimo 8 caracteres, al menos una mayúscula, un número y un carácter especial
                            </p>
                        )}
                    </div>

                    <input
                        type="submit"
                        value="Cambiar contraseña"
                        className="w-full py-2.5 rounded-lg text-white font-bold text-sm uppercase cursor-pointer transition-colors"
                        style={{background: C.primary}}
                        onMouseOver={e => e.target.style.background = '#0f2540'}
                        onMouseOut={e =>  e.target.style.background = C.primary}
                    />

                </form>
            </div>
        </>
    )
}

export default CardPassword