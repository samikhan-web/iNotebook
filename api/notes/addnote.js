import { connectDB } from "../../lib/db";
import Note from "../../backend/models/Note";
import { fetchuser } from "../../backend/middleware/fetchuser";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") return res.status(405).end();

  try {
    const user = fetchuser(req);
    const { title, description, tag } = req.body;

    const note = await Note.create({
      title,
      description,
      tag,
      user: user.id
    });

    res.json(note);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}