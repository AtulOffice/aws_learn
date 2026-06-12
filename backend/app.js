import express from "express"
import cors from "cors"
import { router } from "./routes/noteRoutes.js"

const app = express();

const corsOptions = {
    origin: [
        `${process.env.FRONT_PORT}`,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/notes", router);
app.get("/", (req, res) => {
    res.send("hello i am server message")
})
export default app;