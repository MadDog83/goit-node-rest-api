import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import contactsRouter from "./routes/contactsRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Connection URL
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@albion.ohd8gbb.mongodb.net/db-contacts?retryWrites=true&w=majority`;

// Connect to the database
mongoose
  .connect(url)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
