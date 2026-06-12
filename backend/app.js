import express from "express"
import cors from "cors"
import { router } from "./routes/noteRoutes.js"

const app = express();

const corsOptions = {
    origin: [
        `${process.env.FRONT_PORT}`,
        `http://localhost:3000`,
        `http://localhost:5173`,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/notes", router);
export default app;