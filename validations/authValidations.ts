import { invalid_type_error, required_error } from "@/constants";
import { z } from "zod";

export const authShema = z.object({
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
});
