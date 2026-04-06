import { connectDB } from "../../backend/lib/db";
import User from "../../backend/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET
    );

    res.json({ success: true, authtoken: token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}