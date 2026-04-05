// middleware/fetchuser.js
import jwt from "jsonwebtoken";

export const fetchuser = (req) => {
  const token = req.headers["auth-token"];

  if (!token) {
    throw new Error("Unauthorized");
  }

  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data.user;
};