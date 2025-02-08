import express from "express";
import userRouter from "./routes/user";
import contentRouter from "./routes/content";
import brainRouter from "./routes/brain";
import cors from "cors"
const app = express();
app.use(express.json());

const PORT = 3000;
app.use(cors())
app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);

app.get('/', (req, res) => {
    res.send("home");
})

app.listen(PORT, () => {
    console.log(`listening the port ${PORT}`);
})