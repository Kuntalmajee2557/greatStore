import {Schema, TypeOf, z} from "zod";


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

export enum contentType {
    ARTICLE= "ARTICLE",
    VIDEO= "VIDEO",
    IMAGE= "IMAGE",
    AUDIO= "AUDIO"
}

export const contentInput = z.object({
    link: z.string(),
    type: z.nativeEnum(contentType),
    title: z.string(),
    tags: z.array(z.string()).optional(),
    userId: z.string()
})

export type contentInput = z.infer<typeof contentInput>