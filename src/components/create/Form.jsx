import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { ToastContainer } from "react-toastify"
import { MdCloudUpload, MdBook } from "react-icons/md"
import storePublicaciones, { CATEGORIAS } from "../../context/storePublicaciones"
import { reglasPublicacion, validarImagen } from "../../utils/validaciones"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

const fieldCls = "block w-full rounded-lg py-2 px-3 text-sm text-gray-700 outline-none transition-all"
const fieldStyle      = { border:`1.5px solid #e2e8f0`, background:'#fff' }
const fieldStyleError = { border:`1.5px solid #dc2626`, background:'#fff' }
const onFocus      = e => { e.target.style.borderColor = C.primary;  e.target.style.boxShadow = '0 0 0 3px rgba(26,58,92,0.08)' }
const onBlur       = e => { e.target.style.borderColor = '#e2e8f0';  e.target.style.boxShadow = 'none' }
const onFocusError = e => { e.target.style.borderColor = '#dc2626';  e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.1)' }
const onBlurError  = e => { e.target.style.borderColor = '#dc2626';  e.target.style.boxShadow = 'none' }

export const Form = () => {
    const [preview,     setPreview]     = useState(null)
    const [archivo,     setArchivo]     = useState(null)
    const [imagenError, setImagenError] = useState(null)
    const [loading,     setLoading]     = useState(false)

    const navigate = useNavigate()
    const { crearPublicacion } = storePublicaciones()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const error = validarImagen(file)
        if (error) {
            setImagenError(error)
            setPreview(null)
            setArchivo(null)
            e.target.value = ""   // limpiar el input
            return
        }

        setImagenError(null)
        setArchivo(file)
        setPreview(URL.createObjectURL(file))
    }

    const onSubmit = async (dataForm) => {
        // Bloquear el envio si hay error de la imagen 
        if (imagenError) return

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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl" noValidate>

                {/* Título */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                        Título del libro <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Cálculo diferencial - Stewart"
                        className={fieldCls}
                        style={errors.titulo ? fieldStyleError : fieldStyle}
                        onFocus={errors.titulo ? onFocusError : onFocus}
                        onBlur={errors.titulo ? onBlurError : onBlur}
                        {...register("titulo", reglasPublicacion.titulo)}
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
                        style={errors.categoria ? fieldStyleError : fieldStyle}
                        onFocus={errors.categoria ? onFocusError : onFocus}
                        onBlur={errors.categoria ? onBlurError : onBlur}
                        {...register("categoria", reglasPublicacion.categoria)}
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
                        style={{...(errors.descripcion ? fieldStyleError : fieldStyle), resize:'none'}}
                        onFocus={errors.descripcion ? onFocusError : onFocus}
                        onBlur={errors.descripcion ? onBlurError : onBlur}
                        {...register("descripcion", reglasPublicacion.descripcion)}
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
                        min="0.01"
                        placeholder="Ej: 15.00"
                        className={fieldCls}
                        style={errors.precio ? fieldStyleError : fieldStyle}
                        onFocus={errors.precio ? onFocusError : onFocus}
                        onBlur={errors.precio ? onBlurError : onBlur}
                        {...register("precio", reglasPublicacion.precio)}
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
                            border: `2px dashed ${imagenError ? '#dc2626' : C.border}`,
                            background: C.bg,
                        }}
                        onMouseOver={e => e.currentTarget.style.borderColor = imagenError ? '#dc2626' : C.primary}
                        onMouseOut={e =>  e.currentTarget.style.borderColor = imagenError ? '#dc2626' : C.border}
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="preview"
                                className="h-40 object-contain rounded-lg"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2" style={{color: C.muted}}>
                                <MdCloudUpload className="text-4xl" style={{color: imagenError ? '#dc2626' : C.primary}} />
                                <span className="text-sm font-medium" style={{color: imagenError ? '#dc2626' : C.primary}}>
                                    Haz clic para subir una imagen
                                </span>
                                <span className="text-xs" style={{color: C.muted}}>
                                    JPG, JPEG, PNG o WEBP — máx. 2 MB
                                </span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>

                    {imagenError && (
                        <p className="text-red-500 text-xs mt-1">{imagenError}</p>
                    )}

                    {/* Si hay imagen cargada OK, mostrar botón para quitarla */}
                    {archivo && !imagenError && (
                        <div className="flex items-center justify-between mt-2 px-3 py-2 rounded-lg"
                            style={{background: '#f0fdf4', border:'1px solid #bbf7d0'}}>
                            <span className="text-xs text-green-700 font-medium truncate max-w-xs">
                                ✓ {archivo.name} ({(archivo.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                            <button
                                type="button"
                                onClick={() => { setArchivo(null); setPreview(null) }}
                                className="text-xs text-red-500 hover:text-red-700 ml-3 flex-shrink-0"
                            >
                                Quitar
                            </button>
                        </div>
                    )}
                </div>

                {/* Botón */}
                <button
                    type="submit"
                    disabled={loading}
                    className="text-white px-8 py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{background: C.primary}}
                    onMouseOver={e => !loading && (e.currentTarget.style.background = '#0f2540')}
                    onMouseOut={e =>   e.currentTarget.style.background = C.primary}
                >
                    {loading ? "Publicando..." : "Crear publicación"}
                </button>

            </form>
        </>
    )
}