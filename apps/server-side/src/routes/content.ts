import express, { Router } from "express"
import { contentInput } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
const router : Router = express.Router()

router.get('/', (req, res) =>{
    res.send("hey from content router")
})

router.post('/', async (req, res) =>{
    const body = await req.body;
    const {success} = contentInput.safeParse(body);
    if(!success){
        res.status(403).json({ error: "Error in input" })
        return;
    }
    try{
        const content = prismaClient.content.create({
            data: {
                link: body.url,
                type: body.type,
                title: body.title,
                tags: body.tags,
                userId: body.userId
            }
        })
        res.status(200).json({message: "content created"});
    }catch(err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
})

router.get('/', async (req, res) =>{
    const body = await req.body;
    const {success} = contentInput.safeParse(body);
    if(!success){
        res.status(403).json({ error: "Error in input" })
        return;
    }
    try{
        const contents = await prismaClient.content.findMany({
            where:{
                userId: body.userId
            }
        })
        if(!contents){
            res.status(403).json({error: "no content found"})
            return;
        }
        res.status(200).json({
            contents: contents
        })
    }catch(err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
})

router.delete('/', async (req, res) =>{
    const body = await req.body;
    const {success} = contentInput.safeParse(body);
    if(!success){
        res.status(403).json({ error: "Error in input" })
        return;
    }
    try{
        const content = await prismaClient.content.findFirst({
            where: {
                id: body.contentId
            }
        })
        if(content?.userId != body.userId){
            res.status(403).json({ error: "Trying to delete a doc you don’t own" })
            return;
        }
        const deletedContent = await prismaClient.content.delete({
            where:{
                id: body.contentId
            }
        })
        res.status(200).json({message: "deleted succeded"});
    }catch(err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
})

export default router;