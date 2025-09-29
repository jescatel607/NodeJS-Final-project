import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ id: user._id, email: user.email });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Bad credentials" });
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (e) {
    next(e);
  }
};
