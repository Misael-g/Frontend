import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import storeProfile from "../../context/storeProfile"
import storeAuth from "../../context/storeAuth"


const CardPassword = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { user, updatePasswordProfile } = storeProfile()
    const { clearToken } = storeAuth()

    const updatePassword = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarpassword`
        const response = await updatePasswordProfile(url, dataForm)
        // Si el backend respondió OK, cerrar sesión para que inicie con la nueva contraseña
        if (response) {
            reset()
            clearToken()
        }
    }

    return (
        <>
            <ToastContainer />

            <div className="mt-5">
                <h1 className="font-black text-2xl text-gray-500 mt-16">Actualizar contraseña</h1>
                <hr className="my-4 border-t-2 border-gray-300" />
            </div>

            <form onSubmit={handleSubmit(updatePassword)}>

                {/* Contraseña actual */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Contraseña actual</label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña actual"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-1"
                        {...register("passwordactual", { required: "La contraseña actual es obligatoria" })}
                    />
                    {errors.passwordactual && (
                        <p className="text-red-600 text-xs mb-4">{errors.passwordactual.message}</p>
                    )}
                    {!errors.passwordactual && <div className="mb-5" />}
                </div>

                {/* Nueva contraseña */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Nueva contraseña</label>
                    <input
                        type="password"
                        placeholder="Ingresa la nueva contraseña"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-1"
                        {...register("passwordnuevo", { required: "La nueva contraseña es obligatoria" })}
                    />
                    {errors.passwordnuevo && (
                        <p className="text-red-600 text-xs mb-4">{errors.passwordnuevo.message}</p>
                    )}
                    {!errors.passwordnuevo && <div className="mb-5" />}
                </div>

                {/* Botón cambiar */}
                <input
                    type="submit"
                    className="bg-gray-800 w-full p-2 text-slate-300 uppercase
                    font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
                    value="Cambiar contraseña"
                />

            </form>
        </>
    )
}

export default CardPassword