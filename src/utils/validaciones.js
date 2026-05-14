// validaciones

const SOLO_LETRAS_ESPACIOS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
const TELEFONO_EC          = /^09\d{8}$/
const TIENE_MAYUSCULA      = /[A-Z]/
const TIENE_NUMERO         = /[0-9]/
const SOLO_BASURA          = /^[^aeiouáéíóuAEIOUÁÉÍÓÚ]{8,}$/

export const FORMATOS_IMAGEN_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGEN_MB              = 2
export const MAX_IMAGEN_BYTES           = MAX_IMAGEN_MB * 1024 * 1024

export const CATEGORIAS = [
    'Matemáticas', 'Física', 'Programación', 'Electrónica',
    'Química', 'Administración', 'Economía', 'Humanidades', 'Inglés', 'Otros'
]


// Reegistro
export const reglasRegistro = {
    nombre: {
        required: 'El nombre es obligatorio',
        minLength: { value: 2, message: 'El nombre debe tener mínimo 2 caracteres' },
        maxLength: { value: 50, message: 'El nombre no puede superar los 50 caracteres' },
        pattern: { value: SOLO_LETRAS_ESPACIOS, message: 'El nombre solo puede contener letras y espacios' },
    },
    email: {
        required: 'El correo electrónico es obligatorio',
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'El correo no tiene un formato válido' },
    },
    password: {
        required: 'La contraseña es obligatoria',
        minLength: { value: 8, message: 'La contraseña debe tener mínimo 8 caracteres' },
        validate: {
            tieneMayuscula: v => TIENE_MAYUSCULA.test(v) || 'Debe tener al menos una letra mayúscula',
            tieneNumero:    v => TIENE_NUMERO.test(v)    || 'Debe tener al menos un número',
        },
    },
    telefono: {
        required: 'El teléfono es obligatorio',
        pattern: { value: TELEFONO_EC, message: 'Debe empezar con 09 y tener exactamente 10 dígitos' },
    },
    carrera: {
        minLength: { value: 3, message: 'La carrera debe tener mínimo 3 caracteres' },
        maxLength: { value: 80, message: 'La carrera no puede superar los 80 caracteres' },
        pattern: { value: SOLO_LETRAS_ESPACIOS, message: 'La carrera solo puede contener letras y espacios' },
    },
}

//  loogin
export const reglasLogin = {
    email: {
        required: 'El correo electrónico es obligatorio',
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'El correo no tiene un formato válido' },
    },
    password: {
        required: 'La contraseña es obligatoria',
    },
}

//  el recuperar contraseña 
export const reglasRecuperarPassword = {
    email: {
        required: 'El correo electrónico es obligatorio',
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'El correo no tiene un formato válido' },
    },
}

//  el nuevo password 
export const reglasNuevoPassword = {
    password: {
        required: 'La contraseña es obligatoria',
        minLength: { value: 8, message: 'Debe tener mínimo 8 caracteres' },
        validate: {
            tieneMayuscula: v => TIENE_MAYUSCULA.test(v) || 'Debe tener al menos una letra mayúscula',
            tieneNumero:    v => TIENE_NUMERO.test(v)    || 'Debe tener al menos un número',
        },
    },
   
}


//  Perfil 
export const reglasActualizarPerfil = {
    nombre: {
        required: 'El nombre es obligatorio',
        minLength: { value: 2, message: 'El nombre debe tener mínimo 2 caracteres' },
        maxLength: { value: 50, message: 'El nombre no puede superar los 50 caracteres' },
        pattern: { value: SOLO_LETRAS_ESPACIOS, message: 'El nombre solo puede contener letras y espacios' },
    },
    email: {
        required: 'El correo electrónico es obligatorio',
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'El correo no tiene un formato válido' },
    },
    telefono: {
        required: 'El teléfono es obligatorio',
        pattern: { value: TELEFONO_EC, message: 'Debe empezar con 09 y tener exactamente 10 dígitos' },
    },
    carrera: {
        minLength: { value: 3, message: 'La carrera debe tener mínimo 3 caracteres' },
        maxLength: { value: 80, message: 'La carrera no puede superar los 80 caracteres' },
        pattern: { value: SOLO_LETRAS_ESPACIOS, message: 'La carrera solo puede contener letras y espacios' },
    },
}

// caambiar contraseña 
export const reglasCambiarPassword = {
    passwordactual: {
        required: 'La contraseña actual es obligatoria',
    },
    passwordnuevo: {
        required: 'La nueva contraseña es obligatoria',
        minLength: { value: 8, message: 'Debe tener mínimo 8 caracteres' },
        validate: {
            tieneMayuscula: v => TIENE_MAYUSCULA.test(v) || 'Debe tener al menos una letra mayúscula',
            tieneNumero:    v => TIENE_NUMERO.test(v)    || 'Debe tener al menos un número',
        },
    },
}

//  Crear y   editar publicacion 
export const reglasPublicacion = {
    titulo: {
        required: 'El título es obligatorio',
        minLength: { value: 5,   message: 'El título debe tener mínimo 5 caracteres' },
        maxLength: { value: 100, message: 'El título no puede superar los 100 caracteres' },
        validate: v => !SOLO_BASURA.test(v) || 'El título no parece válido',
    },
    descripcion: {
        required: 'La descripción es obligatoria',
        minLength: { value: 10,  message: 'La descripción debe tener mínimo 10 caracteres' },
        maxLength: { value: 500, message: 'La descripción no puede superar los 500 caracteres' },
    },
    precio: {
        required: 'El precio es obligatorio',
        min: { value: 0.01, message: 'El precio debe ser mayor a 0' },
    },
    categoria: {
        required: 'Selecciona una categoría',
    },
}

//  Validacion de imagen 
export const validarImagen = (file) => {
    if (!file) return null
    if (!FORMATOS_IMAGEN_PERMITIDOS.includes(file.type)) {
        return 'Formato no permitido. Solo se aceptan JPG, JPEG, PNG o WEBP'
    }
    if (file.size > MAX_IMAGEN_BYTES) {
        return `La imagen no puede superar los ${MAX_IMAGEN_MB} MB (tu archivo pesa ${(file.size / 1024 / 1024).toFixed(2)} MB)`
    }
    return null
}