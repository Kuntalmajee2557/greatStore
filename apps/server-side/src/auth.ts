import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }

async function middleware(req: Request, res: Response, next: Function) {
    const jwt = req.header("Authorization");

    if (!jwt?.startsWith("Bearer ")) {
        res.status(401).json({ error: "unauthorized" });
        return;
    }

    const token = jwt.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "unauthorized" });
        return;
    }
    try{
        const payload = await verify(token, "12345") as { id: string };

        if (!payload) {
            res.status(401).json({ error: "unauthorized" });
            return;
        }
    
        req.userId = payload.id;
        await next()
    }catch(err){
        res.status(401).json({ error: "internal auth error" });
        return;
    }

}

export default middleware