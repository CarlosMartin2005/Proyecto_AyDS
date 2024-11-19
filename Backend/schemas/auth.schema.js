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
        "firstName": z.string(),
        "lastName": z.string(),
        "role": z.enum(['admin', 'docente', 'alumno']).default('alumno'),
        "email": z.string().email({
            message: "El email no es válido"
        }),
        "must_change_password": z.number().min(0).max(1).default(1).optional(),
        "status": z.enum(['activo', 'inactivo']).optional(),
    },
)

export const validateAuth = (data) => authSchema.safeParse(data);
export const validateRegister = (data) => RegisterSchema.safeParse(data);