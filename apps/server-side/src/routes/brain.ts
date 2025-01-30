import { contentInput, shareInput } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import express, { Router, Request, Response } from "express"
import { random } from "../utils";
import middleware from "../auth";
const router: Router = express.Router();

router.post("/share", middleware, async (req: Request, res: Response) => {
    const body = await req.body;
    const { success } = shareInput.safeParse(body);
    if (!success) {
        res.status(403).json({ error: "Error in input" })
        return;
    }
    try {
        const { share } = req.body;
        console.log("enter")
        if (share) {
            const existingLink = await prismaClient.link.findFirst({
                where: {
                    userId: req.userId
                }
            })
            if (existingLink) {
                res.status(200).json({ link: existingLink.hash })
                return;
            }
            const hash = random(10);
            await prismaClient.link.create({
                data: {
                    userId: req.userId as string,
                    hash
                }
            })
            res.status(200).json({ link: hash })
        }
        else {
            await prismaClient.link.deleteMany({
                where: {
                    userId: req.userId
                }
            })
            res.json({ message: "Removed link" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})


router.get("/:shareLink", async (req: Request, res: Response) => {
    const hash = req.params.shareLink;
    try {
        const link = await prismaClient.link.findFirst({
            where: {
                hash
            }
        })
        if (!link) {
            res.status(404).json({ message: "invalid share link" })
            return;
        }
        const brain = await prismaClient.user.findFirst({
            where: {
                id: link?.userId
            },
            select: {
                username: true,
                links: {
                    select: {
                        hash: true
                    }
                },
                contents: {
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
                }
            }
        })

        if (!brain) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.json({
            username: brain.username,
            brain
        })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})
export default router