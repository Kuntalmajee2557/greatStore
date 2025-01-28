import express from "express"
import userRouter from "./routes/user"
import { prismaClient } from "@repo/db/client"
const app = express()
app.use(express.json())

const PORT = 3000;

app.use("/api/v1/user", userRouter)

app.get('/', (req, res) => {
    res.send("home")
})

app.listen(PORT, () => {
    console.log(`listening the port ${PORT}`)
})