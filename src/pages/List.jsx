import Table from "../components/list/Table"

const C = { primary:'#1a3a5c', border:'#e2e8f0', muted:'#64748b' }

const List = () => {
    return (
        <div>
            <h1 className='font-black text-2xl' style={{color: C.primary}}>Libros disponibles</h1>
            <hr className='my-3' style={{borderColor: C.border}} />
            <p className='mb-6 text-sm' style={{color: C.muted}}>
                Explora todos los libros académicos publicados en la plataforma
            </p>
            <Table />
        </div>
    )
}

export default List