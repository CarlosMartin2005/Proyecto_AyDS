import { z } from 'zod';

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const RegisterSchema = z.object(
    {
        "username": z.string({
            invalid_type_error: "El nombre debe ser un string"
        }).trim().min(3, {
            message: "El nombre debe tener al menos 3 caracteres"
        }).optional(),
        "password": z.string().trim(),
        "nombre": z.string(),
        "apellido": z.string(),
        "rol": z.enum(['Super', 'Docente', 'Alumno']).default('Alumno'),
        "email": z.string().email({
            message: "El email no es válido"
        }),
        "status": z.enum(['A', 'I']).optional(),
    },
)

export const validateAuth = (data) => authSchema.safeParse(data);
export const validateRegister = (data) => RegisterSchema.safeParse(data);