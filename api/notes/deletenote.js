import { connectDB } from "../../lib/db";
import Note from "../../models/Note";
import { fetchuser } from "../../middleware/fetchuser";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "DELETE") return res.status(405).end();

  try {
    const user = fetchuser(req);
    const { id } = req.query; 

    let note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "Not found" });

    if (note.user.toString() !== user.id) {
      return res.status(401).json({ error: "Not allowed" });
    }

    await Note.findByIdAndDelete(id);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}