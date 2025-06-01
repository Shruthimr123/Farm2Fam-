import { z } from 'zod'
// we are using zod for typesafe validation schema
// name: must >=3 charater ,
// username:  
// email:email validation,
// password:>8 char 1 capital letter and special character
// we function called refine to check if the password matches the confirm password
// phone : 10 digit number

export const signUpSchema = z.object(
    {
        name: z
            .string()
            .min(3, "Name must be atleast 3 character ")
            .max(50, "Name must be under 59 caharacter"),

        // username: z
        //     .string()
        //     .min(3, "Name must be atleast 3 character ")
        //     .max(50, "Name must be under 59 caharacter"),

        email: z
            .string()
            .email("Enter valid email"),

        phone: z
            .string()
            .regex(/^[6-9]\d{9}$/, "Enter a valid 10 digit indian phone number"),

        password: z
            .string()
            .min(8, "Password must be atleast 8 character")
            .regex(/[A-Z]/, "Password must include atleast one upper case letter")
            .regex(/[a-z]/, "Password must include atleast one lower case letter")
            .regex(/\d/, "Password must include atleast one number")
            .regex(/[~!@#$%^&*()_?]/, "Password must include atleast one special character"),

        confirmPassword: z
            .string()
    }
).refine((data) => 
        data.password === data.confirmPassword,
        {
            message: "Password do not match",
            path: ['confirmPassword']
        }
    )

    export type signUpSchemaType=z.infer<typeof signUpSchema>