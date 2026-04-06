import { connectDB } from "../../backend/lib/db";
import User from "../../backend/models/User";
import bcrypt from "bcryptjs";
import { fetchuser } from "../../backend/middleware/fetchuser";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PUT") return res.status(405).end();

  try {
    const userData = fetchuser(req);
    const { oldPassword, newPassword } = req.body;

    let user = await User.findById(userData.id);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}