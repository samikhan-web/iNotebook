import { connectDB } from "../../lib/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") return res.status(405).end();

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: hashed });

    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET
    );

    res.json({ success: true, authtoken: token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}