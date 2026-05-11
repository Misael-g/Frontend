import { Form } from '../components/create/Form'

const C = { primary:'#1a3a5c', border:'#e2e8f0', muted:'#64748b' }

const Create = () => {
    return (
        <div>
            <h1 className='font-black text-2xl' style={{color: C.primary}}>Publicar libro</h1>
            <hr className='my-3' style={{borderColor: C.border}} />
            <p className='mb-6 text-sm' style={{color: C.muted}}>Completa el formulario para publicar tu libro académico</p>
            <Form />
        </div>
    )
}

export default Create