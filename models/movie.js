import mongoose from "mongoose";
const movieSchema = new mongoose.Schema(
  {
    imdbID: { type: String, unique: true, index: true },
    title: String,
    year: String,
    poster: String,
  },
  { timestamps: true }
);
export default mongoose.model("Movie", movieSchema);
