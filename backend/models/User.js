import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  bio: {
    type: String,
    default: "Hey there! I'm using iNotebook.",
  },
  date: { type: Date, default: Date.now },
});

// ✅ IMPORTANT FIX (prevents crash)
export default mongoose.models.user || mongoose.model("user", UserSchema);