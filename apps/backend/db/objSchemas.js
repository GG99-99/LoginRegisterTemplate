import * as z from "zod"; 

export const userForRegister = z.object({
     cedula: z.string(),
     password: z.string(),
     firstName: z.string(),
     lastName: z.string()
})

export const userPublic = z.object({
     rol: z.string(),
     id: z.string()
}).strip()