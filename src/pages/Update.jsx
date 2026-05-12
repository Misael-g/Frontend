import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import { MdCloudUpload } from "react-icons/md"
import storePublicaciones, { CATEGORIAS } from "../context/storePublicaciones"

const C = { primary:'#1a3a5c', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

const fieldCls = "block w-full rounded-lg py-2 px-3 text-sm text-gray-700 outline-none transition-all"
const fieldStyle = { border:`1.5px solid #e2e8f0`, background:'#fff' }
const onFocus = e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = '0 0 0 3px rgba(26,58,92,0.08)' }
const onBlur  = e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none' }

const Update = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { detallePublicacion, publicacionActual, editarPublicacion } = storePublicaciones()

    const [preview, setPreview] = useState(null)
    const [archivo, setArchivo] = useState(null)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    // Cargar datos actuales
    useEffect(() => {
        detallePublicacion(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // Pre-llenar formulario cuando llegan los datos
    useEffect(() => {
        if (publicacionActual) {
            reset({
                titulo:      publicacionActual.titulo,
                descripcion: publicacionActual.descripcion,
                precio:      publicacionActual.precio,
                categoria:   publicacionActual.categoria ?? "",
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
        formData.append("categoria",   dataForm.categoria)
        if (archivo) formData.append("imagen", archivo)

        const ok = await editarPublicacion(id, formData)
        setLoading(false)

        if (ok) navigate(`/dashboard/details/${id}`)
    }

    return (
        <>
            <ToastContainer />

            <div>
                <h1 className="font-black text-2xl" style={{color: C.primary}}>Editar publicación</h1>
                <hr className="my-3" style={{borderColor: C.border}} />
                <p className="mb-6 text-sm" style={{color: C.muted}}>Modifica los campos que deseas actualizar</p>

                {!publicacionActual ? (
                    <div className="flex items-center gap-3 py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-transparent"
                            style={{borderColor:`${C.primary} ${C.border} ${C.border}`}} />
                        <p className="text-sm" style={{color: C.muted}}>Cargando datos...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-2xl">

                        {/* Título */}
                        <div>
                            <label className="block text-sm font-semibold mb-1.5" style={{color: C.primary}}>
                                Título <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
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
                                Imagen{' '}
                                <span className="font-normal" style={{color: C.muted}}>
                                    (deja vacío para mantener la actual)
                                </span>
                            </label>
                            <label
                                className="flex flex-col items-center justify-center w-full rounded-xl cursor-pointer transition-colors py-6"
                                style={{border:`2px dashed ${C.border}`, background: C.bg}}
                                onMouseOver={e => e.currentTarget.style.borderColor = C.primary}
                                onMouseOut={e =>  e.currentTarget.style.borderColor = C.border}
                            >
                                {preview ? (
                                    <img src={preview} alt="preview"
                                        className="h-40 object-contain rounded-lg" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2" style={{color: C.muted}}>
                                        <MdCloudUpload className="text-4xl" style={{color: C.primary}} />
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

                        {/* Botones */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{background: C.primary}}
                                onMouseOver={e => !loading && (e.currentTarget.style.background = '#0f2540')}
                                onMouseOut={e =>  e.currentTarget.style.background = C.primary}
                            >
                                {loading ? "Guardando..." : "Guardar cambios"}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(`/dashboard/details/${id}`)}
                                className="px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
                                style={{border:`1.5px solid ${C.border}`, color: C.muted}}
                                onMouseOver={e => e.currentTarget.style.background = C.bg}
                                onMouseOut={e =>  e.currentTarget.style.background = 'transparent'}
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