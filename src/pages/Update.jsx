import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import { MdCloudUpload } from "react-icons/md"
import storePublicaciones from "../context/storePublicaciones"



const Update = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { detallePublicacion, publicacionActual, editarPublicacion } = storePublicaciones()

    const [preview, setPreview] = useState(null)
    const [archivo, setArchivo] = useState(null)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    // cargar datos actuales 
    useEffect(() => {
        detallePublicacion(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    //  formulario cuando llegan los datos
    useEffect(() => {
        if (publicacionActual) {
            reset({
                titulo:      publicacionActual.titulo,
                descripcion: publicacionActual.descripcion,
                precio:      publicacionActual.precio,
            })
            setPreview(publicacionActual.imagen ?? null)
        }
    }, [publicacionActual, reset])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setArchivo(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const onSubmit = async (dataForm) => {
        setLoading(true)

        const formData = new FormData()
        formData.append("titulo",      dataForm.titulo)
        formData.append("descripcion", dataForm.descripcion)
        formData.append("precio",      dataForm.precio)
        if (archivo) {
            formData.append("imagen", archivo)
        }

        const ok = await editarPublicacion(id, formData)
        setLoading(false)

        if (ok) navigate(`/dashboard/details/${id}`)
    }

    return (
        <>
            <ToastContainer />

            <div>
                <h1 className="font-black text-4xl text-gray-500">Editar publicación</h1>
                <hr className="my-4 border-t-2 border-gray-300" />
                <p className="mb-8 text-gray-500">Modifica los campos que deseas actualizar</p>

                {!publicacionActual ? (
                    <p className="text-gray-400">Cargando datos...</p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">

                        {/* titulo */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Título <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                                {...register("titulo", { required: "El título es obligatorio" })}
                            />
                            {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
                        </div>

                        {/* Descripcioin */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Descripción <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={4}
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 resize-none"
                                {...register("descripcion", { required: "La descripción es obligatoria" })}
                            />
                            {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>}
                        </div>

                        {/* precio */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Precio (USD) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                                {...register("precio", {
                                    required: "El precio es obligatorio",
                                    min: { value: 0, message: "El precio no puede ser negativo" }
                                })}
                            />
                            {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio.message}</p>}
                        </div>

                        {/* imagen */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Imagen <span className="text-gray-400 font-normal">(deja vacío para mantener la actual)</span>
                            </label>
                            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition-colors bg-gray-50 py-6">
                                {preview ? (
                                    <img src={preview} alt="preview" className="h-40 object-contain rounded-md" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-gray-400">
                                        <MdCloudUpload className="text-4xl" />
                                        <span className="text-sm">Haz clic para cambiar imagen</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        {/* botones */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Guardando..." : "Guardar cambios"}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(`/dashboard/details/${id}`)}
                                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>

                    </form>
                )}
            </div>
        </>
    )
}

export default Update