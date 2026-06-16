import express from "express"
import cors from "cors"
import { router } from "./routes/noteRoutes.js"
import dotenv from "dotenv"
import os from "os"
dotenv.config()

const app = express();

// const corsOptions = {
//     origin: [
//         process.env.FRONT_PORT,
//         "http://localhost:5175",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
// };
const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/notes", router);
app.get("/api/notes/server-info", (req, res) => {
    res.json({
        hostname: os.hostname(),
    });
});
app.get("/", (req, res) => {
    res.send("hello i am server message")
})
export default app;