import { connectDB } from "../../lib/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import { fetchuser } from "../../middleware/fetchuser";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PUT") return res.status(405).end();

  try {
    const userData = fetchuser(req);
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Both passwords required" });
    }

    let user = await User.findById(userData.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ error: "Old password incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ success: true, message: "Password updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}