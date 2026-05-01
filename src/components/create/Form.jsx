import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { MdCloudUpload, MdBook } from "react-icons/md"
import storePublicaciones, { CATEGORIAS } from "../../context/storePublicaciones"


export const Form = () => {
    const [preview, setPreview] = useState(null)
    const [archivo, setArchivo] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { crearPublicacion } = storePublicaciones()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    //   imagen seleccionada
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
        formData.append("titulo", dataForm.titulo)
        formData.append("descripcion", dataForm.descripcion)
        formData.append("precio", dataForm.precio)
        formData.append("categoria", dataForm.categoria)
        if (archivo) {
            formData.append("imagen", archivo)
        }

        const ok = await crearPublicacion(formData)
        setLoading(false)

        if (ok) {
            reset()
            setPreview(null)
            setArchivo(null)
            navigate("/dashboard/list")
        }
    }

    return (
        <>
            <ToastContainer />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">

                {/* titulo */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Título del libro <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Cálculo diferencial - Stewart"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
                        {...register("titulo", { required: "El título es obligatorio" })}
                    />
                    {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
                </div>

                {/* categoria */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Categoría <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 bg-white"
                        {...register("categoria", { required: "Selecciona una categoría" })}
                    >
                        <option value="">— Selecciona una categoría —</option>
                        {CATEGORIAS.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>}
                </div>

                {/* descripcion */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Descripción <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Describe el estado del libro, edición, autor, etc."
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
                        placeholder="Ej: 15.00"
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
                        Imagen del libro <span className="text-gray-400 font-normal">(opcional)</span>
                    </label>

                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition-colors bg-gray-50 py-6">
                        {preview ? (
                            <img src={preview} alt="preview" className="h-40 object-contain rounded-md" />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <MdCloudUpload className="text-4xl" />
                                <span className="text-sm">Haz clic para subir una imagen</span>
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
                        className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <MdBook />
                        {loading ? "Publicando..." : "Publicar libro"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/list")}
                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        Cancelar
                    </button>
                </div>

            </form>
        </>
    )
}