import {z} from "zod";


export const SignupInput = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(20)
})

export type SignupInput = z.infer<typeof SignupInput>;


export const SigninInput = z.object({
    username: z.string(),
    password: z.string()
})

export type SigninInput = z.infer<typeof SigninInput>;

