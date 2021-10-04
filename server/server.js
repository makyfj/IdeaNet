import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import connectDB from "./database/dbConnection.js";
import { userRoutes } from "./routes/userRoutes.js";
import { ideaRoutes } from "./routes/ideaRoutes.js";

dotenv.config();

connectDB();

const app = express();

// only in development code
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// body parser -- middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Idea Net API is running");
  });
}

// user routes
app.use("/api/users", userRoutes);
// idea routes
app.use("/api/ideas", ideaRoutes);

// Pages not found
app.use(notFound);

// Error handling in development / production
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running is ${process.env.NODE_ENV} on port ${PORT}`);
});
