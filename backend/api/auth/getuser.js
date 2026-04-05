import { connectDB } from "../../lib/db";
import User from "../../models/User";
import { fetchuser } from "../../middleware/fetchuser";

export default async function handler(req, res) {
  await connectDB();

  try {
    const userData = fetchuser(req);

    const user = await User.findById(userData.id).select("-password");

    res.json(user);

  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}