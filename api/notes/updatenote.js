import { connectDB } from "../../lib/db";
import Note from "../../backend/models/Note";
import { fetchuser } from "../../backend/middleware/fetchuser";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PUT") return res.status(405).end();

  try {
    const user = fetchuser(req);
    const { id, title, description, tag } = req.body;

    let note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "Not found" });

    if (note.user.toString() !== user.id) {
      return res.status(401).json({ error: "Not allowed" });
    }

    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    note = await Note.findByIdAndUpdate(
      id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}