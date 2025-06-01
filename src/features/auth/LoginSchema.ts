import { z } from 'zod'

export const loginSchema = z.object(
    {

        email: z
            .string()
            .email("Enter valid email"),

        password: z
            .string()
            .min(8, "Password must be atleast 8 character")
            .regex(/[A-Z]/, "Password must include atleast one upper case letter")
            .regex(/[a-z]/, "Password must include atleast one lower case letter")
            .regex(/\d/, "Password must include atleast one number")
            .regex(/[~!@#$%^&*()_?]/, "Password must include atleast one special character")
    }
)

  export type loginSchemaType=z.infer<typeof loginSchema>