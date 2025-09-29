import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  searchMovies,
  saveToLibrary,
  myWatchlist,
  removeFromWatchlist,
} from "../controllers/moviesController.js";
const r = Router();

r.get("/search", searchMovies); // public: ?q=inception
r.post("/save", auth, saveToLibrary); // body: OMDb movie fields
r.get("/watchlist", auth, myWatchlist);
r.delete("/watchlist/:movieId", auth, removeFromWatchlist);

export default r;
