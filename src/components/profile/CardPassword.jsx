import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import storeProfile from "../../context/storeProfile"
import storeAuth from "../../context/storeAuth"

const C = { primary:'#1a3a5c', border:'#e2e8f0' }

const CardPassword = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { user, updatePasswordProfile } = storeProfile()
    const { clearToken } = storeAuth()

    const updatePassword = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarpassword`
        const response = await updatePasswordProfile(url, dataForm)
        if (response) {
            reset()
            clearToken()
        }
    }

    return (
        <>
            <ToastContainer />

            <div className="mt-5 rounded-xl p-6 shadow-sm"
                style={{background:'#fff', border:`1px solid ${C.border}`}}>

                <h1 className="font-black text-xl mb-1" style={{color: C.primary}}>
                    Actualizar contraseña
                </h1>
                <hr className="my-3" style={{borderColor: C.border}} />

                <form onSubmit={handleSubmit(updatePassword)}>

                    {/* Contraseña actual */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                            Contraseña actual
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña actual"
                            className="block w-full rounded-lg py-2 px-3 text-sm text-gray-700 outline-none transition-all"
                            style={{border:`1.5px solid ${C.border}`}}
                            onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = '0 0 0 3px rgba(26,58,92,0.08)' }}
                            onBlur={e =>  { e.target.style.borderColor = C.border;  e.target.style.boxShadow = 'none' }}
                            {...register("passwordactual", { required: "La contraseña actual es obligatoria" })}
                        />
                        {errors.passwordactual && (
                            <p className="text-red-600 text-xs mt-1">{errors.passwordactual.message}</p>
                        )}
                        {!errors.passwordactual && <div className="mb-1" />}
                    </div>

                    {/* Nueva contraseña */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa la nueva contraseña"
                            className="block w-full rounded-lg py-2 px-3 text-sm text-gray-700 outline-none transition-all"
                            style={{border:`1.5px solid ${C.border}`}}
                            onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = '0 0 0 3px rgba(26,58,92,0.08)' }}
                            onBlur={e =>  { e.target.style.borderColor = C.border;  e.target.style.boxShadow = 'none' }}
                            {...register("passwordnuevo", { required: "La nueva contraseña es obligatoria" })}
                        />
                        {errors.passwordnuevo && (
                            <p className="text-red-600 text-xs mt-1">{errors.passwordnuevo.message}</p>
                        )}
                        {!errors.passwordnuevo && <div className="mb-1" />}
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