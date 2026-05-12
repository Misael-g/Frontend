import storeProfile from "../../context/storeProfile"

const C = { primary:'#1a3a5c', accent:'#e8a020', border:'#e2e8f0', muted:'#64748b', bg:'#f8fafc' }

export const CardProfile = () => {

    const { user } = storeProfile()

    return (
        <div className="rounded-xl p-5 flex flex-col gap-3 shadow-sm"
            style={{background:'#fff', border:`1px solid ${C.border}`}}>

            {/* Avatar — solo display, sin upload */}
            <div className="flex justify-center mb-1">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/207/207114.png"
                    alt="avatar"
                    className="rounded-full"
                    style={{
                        width: 96, height: 96,
                        border: `2px solid ${C.accent}`,
                        background: C.bg,
                        padding: 8,
                        objectFit: 'contain',
                    }}
                />
            </div>

            {/* Datos */}
            {[
                { label: 'Nombre',   value: user?.nombre },
                { label: 'Correo',   value: user?.email },
                { label: 'Teléfono', value: user?.telefono },
                { label: 'Carrera',  value: user?.carrera ?? '—' },
                { label: 'Rol',      value: user?.rol },
            ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 py-1.5 px-3 rounded-lg"
                    style={{background: C.bg, border:`1px solid ${C.border}`}}>
                    <span className="text-sm font-semibold w-20 flex-shrink-0"
                        style={{color: C.primary}}>
                        {label}:
                    </span>
                    <p className="text-sm capitalize" style={{color: C.muted}}>{value}</p>
                </div>
            ))}
        </div>
    )
}