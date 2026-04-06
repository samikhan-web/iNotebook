import jwt from "jsonwebtoken";

export const fetchuser = (req) => {
  try {
    const token = req.headers["auth-token"];
    if (!token) throw new Error("No token");

    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data.user;
  } catch (err) {
    throw new Error("Unauthorized");
  }
};