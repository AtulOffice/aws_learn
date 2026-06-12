import Note from "../models/Note.js"

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({
            createdAt: -1,
        });

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const createNote = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Note text is required",
            });
        }

        const note = await Note.create({
            text,
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found",
            });
        }

        await note.deleteOne();

        res.status(200).json({
            message: "Note deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
