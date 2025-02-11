import express, { Router } from "express"
import { contentInput, deleteContentInput } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import middleware from "../auth"
const router: Router = express.Router();

router.post('/', middleware, async (req, res) => {
    if (!req.userId) {
        res.json({ error: "userid not found" });
        return;
    }
    const body = await req.body;
    const { success } = contentInput.safeParse(body);
    if (!success) {
        res.status(403).json({ error: "Error in input" })
        return;
    }
    try {
        const existingContent = await prismaClient.content.findFirst({
            where: {
                title: body.title
            }
        })
        if(existingContent){
            res.status(403).json({error: "content already exist"})
            return;
        }

        let tagConnections = {};

        if(body.tags){
            const existingTags = await prismaClient.tag.findMany({
                where: { title: { in: body.tags } }
            });
            const existingTagTitles = existingTags.map((tag: { title: string; id: string; }) => tag.title);
            const newTags = body.tags.filter((tag: string) => !existingTagTitles.includes(tag));
            tagConnections  = {
                connect: existingTags.map((tag: { title: string; id: string; }) => ({ id: tag.id })), // Connect existing tags
                create: newTags.map((tag: string) => ({ title: tag }))
            }
        }

        const contentData: any = {
            link: body.link,
            type: body.type,
            title: body.title,
            userId: req.userId,
            tags: tagConnections
        }
        const content = await prismaClient.content.create({
            data: contentData
        })
        res.status(200).json({ message: "content created", content });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

router.get('/', middleware, async (req, res) => {
    const userId =  req.userId;
    // const {success} = contentInput.safeParse(body);
    // if(!success){
    //     res.status(403).json({ error: "Error in input" })
    //     return;
    // }
    try {
        const contents = await prismaClient.content.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                link: true,
                type: true,
                title: true,
                userId: true,
                tags: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        })
        if (!contents) {
            res.status(403).json({ error: "no content found" })
            return;
        }
        res.status(200).json({
            contents: contents
        })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

router.delete('/', middleware, async (req, res) => {
    const body = await req.body;
    const { success } = deleteContentInput.safeParse(body);
    if (!success) {
        res.status(403).json({ error: "Error in input" })
        return;
    }
    try {
        const content = await prismaClient.content.findFirst({
            where: {
                id: body.contentId
            }
        })
        console.log(content?.userId)
        console.log(req.userId)
        if (content?.userId != req.userId) {
            res.status(403).json({ error: "Trying to delete a doc you don’t own" })
            return;
        }
        const deletedContent = await prismaClient.content.delete({
            where: {
                id: body.contentId
            }
        })
        res.status(200).json({ message: "deleted succeded" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

export default router;