import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { MdCloudUpload, MdBook } from "react-icons/md"
import storePublicaciones, { CATEGORIAS } from "../../context/storePublicaciones"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

const fieldCls = "block w-full rounded-lg py-2 px-3 text-sm text-gray-700 outline-none transition-all"
const fieldStyle = { border:`1.5px solid #e2e8f0`, background:'#fff' }
const onFocus = e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = '0 0 0 3px rgba(26,58,92,0.08)' }
const onBlur  = e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none' }

export const Form = () => {
    const [preview, setPreview] = useState(null)
    const [archivo, setArchivo] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { crearPublicacion } = storePublicaciones()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

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
        formData.append("categoria",   dataForm.categoria)
        if (archivo) formData.append("imagen", archivo)

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

                {/* Título */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Título del libro <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Cálculo diferencial - Stewart"
                        className={fieldCls}
                        style={fieldStyle}
                        onFocus={onFocus} onBlur={onBlur}
                        {...register("titulo", { required: "El título es obligatorio" })}
                    />
                    {errors.titulo && (
                        <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>
                    )}
                </div>

                {/* Categoría */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Categoría <span className="text-red-500">*</span>
                    </label>
                    <select
                        className={fieldCls}
                        style={fieldStyle}
                        onFocus={onFocus} onBlur={onBlur}
                        {...register("categoria", { required: "Selecciona una categoría" })}
                    >
                        <option value="">— Selecciona una categoría —</option>
                        {CATEGORIAS.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errors.categoria && (
                        <p className="text-red-500 text-xs mt-1">{errors.categoria.message}</p>
                    )}
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Descripción <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Describe el estado del libro, edición, autor, etc."
                        className={fieldCls}
                        style={{...fieldStyle, resize:'none'}}
                        onFocus={onFocus} onBlur={onBlur}
                        {...register("descripcion", { required: "La descripción es obligatoria" })}
                    />
                    {errors.descripcion && (
                        <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
                    )}
                </div>

                {/* Precio */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Precio (USD) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Ej: 15.00"
                        className={fieldCls}
                        style={fieldStyle}
                        onFocus={onFocus} onBlur={onBlur}
                        {...register("precio", {
                            required: "El precio es obligatorio",
                            min: { value: 0, message: "El precio no puede ser negativo" }
                        })}
                    />
                    {errors.precio && (
                        <p className="text-red-500 text-xs mt-1">{errors.precio.message}</p>
                    )}
                </div>

                {/* Imagen */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Imagen del libro{' '}
                        <span className="font-normal" style={{color: C.muted}}>(opcional)</span>
                    </label>

                    <label
                        className="flex flex-col items-center justify-center w-full rounded-xl cursor-pointer transition-colors py-6"
                        style={{
                            border: `2px dashed ${C.border}`,
                            background: C.bg,
                        }}
                        onMouseOver={e => e.currentTarget.style.borderColor = C.primary}
                        onMouseOut={e =>  e.currentTarget.style.borderColor = C.border}
                    >
                        {preview ? (
                            <img src={preview} alt="preview" className="h-40 object-contain rounded-lg" />
                        ) : (
                            <div className="flex flex-col items-center gap-2" style={{color: C.muted}}>
                                <MdCloudUpload className="text-4xl" style={{color: C.primary}} />
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

                {/* Botones */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{background: C.primary}}
                        onMouseOver={e => !loading && (e.currentTarget.style.background = '#0f2540')}
                        onMouseOut={e =>  e.currentTarget.style.background = C.primary}
                    >
                        <MdBook />
                        {loading ? "Publicando..." : "Publicar libro"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/list")}
                        className="px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
                        style={{border:`1.5px solid ${C.border}`, color: C.muted}}
                        onMouseOver={e => e.currentTarget.style.background = C.bg}
                        onMouseOut={e =>  e.currentTarget.style.background = 'transparent'}
                    >
                        Cancelar
                    </button>
                </div>

            </form>
        </>
    )
}