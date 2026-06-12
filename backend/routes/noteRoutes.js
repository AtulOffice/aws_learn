import express from "express"
import {
    getNotes,
    createNote,
    deleteNote,
} from "../controllers/noteController.js";

export const router = express.Router();
router.post("/create", createNote);
router.get("/get", getNotes);
router.delete("/:id", deleteNote);
