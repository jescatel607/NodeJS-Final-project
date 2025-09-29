import mongoose from "mongoose";

const watchSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  },
  { timestamps: true }
);

watchSchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model("Watchlist", watchSchema);
