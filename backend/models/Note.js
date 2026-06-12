import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const NoteModel = mongoose.model("Note", noteSchema);
export default NoteModel; 