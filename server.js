import { config } from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import pingRouter from "./routes/ping.js";
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";

import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";

config();

const swaggerDocument = JSON.parse(
  readFileSync(new URL("./swagger.json", import.meta.url))
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// One working API route
app.use("/api/ping", pingRouter);
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
