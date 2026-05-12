import CardPassword from '../components/profile/CardPassword'
import { CardProfile } from '../components/profile/CardProfile'
import FormProfile from '../components/profile/FormProfile'

const C = { primary:'#1a3a5c', border:'#e2e8f0', muted:'#64748b' }

const Profile = () => {
    return (
        <>
            <div className="mb-6">
                <h1 className='font-black text-2xl' style={{color: C.primary}}>Perfil</h1>
                <hr className='my-3' style={{borderColor: C.border}} />
                <p className='text-sm' style={{color: C.muted}}>
                    Gestiona tu cuenta y datos personales
                </p>
            </div>

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>

                {/* Formulario perfil */}
                <div className='w-full md:w-1/2'>
                    <FormProfile />
                </div>

                {/* Card perfil + cambiar contraseña */}
                <div className='w-full md:w-1/2'>
                    <CardProfile />
                    <CardPassword />
                </div>

            </div>
        </>
    )
}

export default Profile