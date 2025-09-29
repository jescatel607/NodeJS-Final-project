import jwt from "jsonwebtoken";
export function auth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer", "");
  if (!token) return res.status(401), json({ message: "No token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ message: "Invaild token" });
  }
}
