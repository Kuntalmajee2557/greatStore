import { contentInput } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import express, { Router, Request, Response } from "express"
const router: Router = express.Router();

router.post("/shere", async (req: Request, res: Response) => {
    const body = await req.body;
    const { success } = contentInput.safeParse(body);
    if (!success) {
        res.status(403).json({ error: "Error in input" })
        return;
    }
    try {
        const { shere } = req.body;
        if (shere) {
            const existingLink = await prismaClient.link.findFirst({
                where: {
                    userId: body.userId
                }
            })
            if (existingLink) {
                res.json({ link: existingLink.hash })
                return;
            }
            const hash = random(10);
            await prismaClient.link.create({ userId: body.userId, hash })
            res.json({ link: hash })
        }
        else{
            await prismaClient.link.delete({
                where: {
                    userId: body.userId
                }
            })
            res.json({message: "Removed link"})
        }

    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})


router.get("/:shareLink", async (req: Request, res: Response) => {
    const hash = req.params.shareLink;
    try {
        const link = await prismaClient.link.findFirst({hash})
        if(!link){
            res.status(404).json({message: "invalid share link"})
            return;
        }
        const content = await prismaClient.content.findMany({
            where: {
                userId: link?.userId
            }
        })
        const user = await prismaClient.user.findFirst({
            where: {
                id: link?.userId
            }
        })

        if(!user){
            res.status(404).json({ message: "user not found"});
            return;
        }
        res.json({
            username: user.username,
            content
        })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})
export default router