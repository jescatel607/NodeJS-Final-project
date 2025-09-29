import axios from "axios";
import Movie from "../models/movie.js";
import Watchlist from "../models/watchlist.js";

export const searchMovies = async (req, res, next) => {
  try {
    const { q } = req.query;
    const { data } = await axios.get("https://www.omdbapi.com/", {
      params: { s: q, apikey: process.env.OMDB_API_KEY, type: "movie" },
    });
    res.json(data);
  } catch (e) {
    next(e);
  }
};

export const saveToLibrary = async (req, res, next) => {
  try {
    const { imdbID, Title: title, Year: year, Poster: poster } = req.body;
    const movie = await Movie.findOneAndUpdate(
      { imdbID },
      { imdbID, title, year, poster },
      { upsert: true, new: true }
    );
    await Watchlist.create({ user: req.userId, movie: movie._id });
    res.status(201).json(movie);
  } catch (e) {
    next(e);
  }
};

export const myWatchlist = async (req, res, next) => {
  try {
    const items = await Watchlist.find({ user: req.userId }).populate("movie");
    res.json(items.map((i) => i.movie));
  } catch (e) {
    next(e);
  }
};

export const removeFromWatchlist = async (req, res, next) => {
  try {
    await Watchlist.findOneAndDelete({
      user: req.userId,
      movie: req.params.movieId,
    });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
