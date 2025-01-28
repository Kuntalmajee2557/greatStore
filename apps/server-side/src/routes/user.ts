import express, { Router, Request, Response } from 'express'
import { prismaClient } from "@repo/db/client";
import { SigninInput, SignupInput } from "@repo/common/types"
import { sign } from "jsonwebtoken";

const router: Router = express.Router();

router.get('/', (req, res) => {
    res.send("hii from user")
})

router.post("/signup", async (req: Request, res: Response) => {
    const body = await req.body;
    const {success} = SignupInput.safeParse(body);
    if(!success){
        return res.status(403).json({ error: "Error in input" })
    }
    try{
        const existingUser = await prismaClient.user.findUnique({
            where:{
                username: body.username
            }
        })
        if(existingUser){
            return res.status(403).json({ message: "user already exists with this username"});
        }

        const user = await prismaClient.user.create({
            data: {
                username : body.username,
                password : body.password
            }
        })
        const jwt = await sign({ id: user.id }, "12345")
        return res.status(200).json({
            message: "user created",
            token: jwt
        })
    } catch(err) {
        return res.status(500).json({message: "Internal server error"});
    }
})

router.post("/signin", async (req, res) => {
    const body = await req.body;
    const {success} = SigninInput.safeParse(body);
    if(!success){
        return res.status(403).json({ error: "Error in input" })
    }
    try{
        const user = await prismaClient.user.findFirst({
            where: {
                username: body.username
            }
        })
        if(!user){
            return res.status(411).json({ message: "user not found" })
        }
        if(body.password != user?.password){
            return res.status(403).json({ message: "wrong password" })
        }
        const jwt = await sign({ id: user?.id}, "12345")
        return res.status(200).json({ token: jwt })
    }catch(err){
        return res.status(500).json({message: "Internal server error"});

    }
})

export default router