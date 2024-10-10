import { invalid_type_error, required_error } from "@/constants";
import { z } from "zod";

export const customerShema = z.object({
    firstName: z
        .string({ invalid_type_error, required_error })
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
        .max(50, { message: "El nombre debe tener como maximo 50 caracteres" })
        .refine((value) => value.trim() !== "", {
            message: "El nombre no puede ser vacio",
        }),
    lastName: z
        .string({ invalid_type_error, required_error })
        .min(3, { message: "El apellido debe tener al menos 3 caracteres" })
        .max(50, { message: "El apellido debe tener como maximo 50 caracteres" })
        .refine((value) => value.trim() !== "", {
            message: "El apellido no puede ser vacio",
        }),
    phone: z
        .string({ invalid_type_error, required_error })
        .min(8, { message: "El telefono debe tener al menos 8 caracteres" })
        .max(50, { message: "El telefono debe tener como maximo 50 caracteres" })
        .refine((value) => value.trim() !== "", {
            message: "El telefono no puede ser vacio",
        }),
    nit: z
        .string({ invalid_type_error, required_error })
        .min(9, { message: "El nit debe tener al menos 9 caracteres" })
        .max(50, { message: "El nit debe tener como maximo 50 caracteres" })
        .refine((value) => value.trim() !== "", {
            message: "El nit no puede ser vacio",
        }),
    cui: z
        .string({ invalid_type_error, required_error })
        .min(13, { message: "El cui debe tener al menos 13 caracteres" })
        .max(50, { message: "El cui debe tener como maximo 50 caracteres" })
        .refine((value) => value.trim() !== "", {
            message: "El cui no puede ser vacio",
        }),
    email: z
        .string({ invalid_type_error, required_error })
        .email({ message: "El email no es valido" })
        .min(5, { message: "El email debe tener al menos 5 caracteres" })
        .max(50, { message: "El email debe tener como maximo 50 caracteres" })
        .refine((value) => value.trim() !== "", {
            message: "El email no puede ser vacio",
        }),
    password: z
        .string({ invalid_type_error, required_error })
        .min(5, { message: "La contraseña debe tener al menos 5 caracteres" })
        .max(50, { message: "La contraseña debe tener como maximo 50 caracteres" })
        .refine((value) => value.trim() !== "", {
            message: "La contraseña no puede ser vacia",
        }),
    alias: z
        .string({ invalid_type_error, required_error })
        .min(5, { message: "El alias debe tener al menos 5 caracteres" })
        .max(50, { message: "El alias debe tener como maximo 50 caracteres" })
        .refine((value) => value.trim() !== "", {
            message: "El alias no puede ser vacio",
        }),
    deleted: z.boolean(),
});