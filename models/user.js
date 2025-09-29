import mongoose from "mongoose";
import { hash, compare } from "bcryptjs"; // ✅ use named imports

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (pw) {
  return compare(pw, this.password);
};

export default mongoose.model("User", userSchema);
