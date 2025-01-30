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

export const contentType = {
    ARTICLE: "ARTICLE",
    VIDEO: "VIDEO",
    IMAGE: "IMAGE",
    AUDIO: "AUDIO"
} as const;
export type ContentType = keyof typeof contentType;

export const contentInput = z.object({
    link: z.string(),
    type: z.enum(["ARTICLE", "VIDEO", "IMAGE", "AUDIO"]),
    title: z.string(),
    tags: z.array(z.string()).optional()
})

export type contentInput = z.infer<typeof contentInput>

export const deleteContentInput = z.object({
    contentId: z.string()
})

export type deleteContentInput = z.infer<typeof deleteContentInput>

export const shareInput = z.object({
    share: z.boolean()
})

export type shareInput = z.infer<typeof shareInput>