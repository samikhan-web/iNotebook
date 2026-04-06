import { connectDB } from "../../lib/db";
import User from "../../models/User";
import { fetchuser } from "../../middleware/fetchuser";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PUT") return res.status(405).end();

  try {
    const userData = fetchuser(req);
    const { name, email } = req.body;

    const newUser = {};
    if (name) newUser.name = name;
    if (email) newUser.email = email;

    let user = await User.findById(userData.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user = await User.findByIdAndUpdate(
      userData.id,
      { $set: newUser },
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}