import express from "express";
import cors from "cors";
import { config } from "dotenv";
import pingRouter from "./routes/ping.js";

config();
const app = express();

app.use(cors());
app.use(express.json());

// The frontend from /public
app.use(express.static("public"));

// One working API route
app.use("/api/ping", pingRouter);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
