import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import storeProfile from "../../context/storeProfile"


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

    return (

        <form onSubmit={handleSubmit(updateUser)}>

            <ToastContainer />

            {/* Nombre */}
            <div>
                <label className="mb-2 block text-sm font-semibold">Nombre</label>
                <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-1"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                />
                {errors.nombre && <p className="text-red-600 text-xs mb-4">{errors.nombre.message}</p>}
                {!errors.nombre && <div className="mb-5" />}
            </div>

            {/* Email */}
            <div>
                <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-1"
                    {...register("email", { required: "El correo es obligatorio" })}
                />
                {errors.email && <p className="text-red-600 text-xs mb-4">{errors.email.message}</p>}
                {!errors.email && <div className="mb-5" />}
            </div>

            {/* Teléfono */}
            <div>
                <label className="mb-2 block text-sm font-semibold">Teléfono</label>
                <input
                    type="text"
                    inputMode="tel"
                    placeholder="Ingresa tu teléfono"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-1"
                    {...register("telefono", { required: "El teléfono es obligatorio" })}
                />
                {errors.telefono && <p className="text-red-600 text-xs mb-4">{errors.telefono.message}</p>}
                {!errors.telefono && <div className="mb-5" />}
            </div>

            {/* Carrera (opcional) */}
            <div>
                <label className="mb-2 block text-sm font-semibold">
                    Carrera <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <input
                    type="text"
                    placeholder="Ej: Ingeniería en Sistemas"
                    className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                    {...register("carrera")}
                />
            </div>

            {/* Botón actualizar */}
            <input
                type="submit"
                className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase
                font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
                value="Actualizar perfil"
            />

        </form>
    )
}

export default FormProfile