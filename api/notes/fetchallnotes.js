import { connectDB } from "../../backend/lib/db";
import Note from "../../backend/models/Note";
import { fetchuser } from "../../backend/middleware/fetchuser";

export default async function handler(req, res) {
  await connectDB();

  try {
    const user = fetchuser(req);

    const notes = await Note.find({ user: user.id });

    res.json(notes);

  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}