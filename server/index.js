import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import "dotenv/config";

const { PORT, MONGO_DB_URL } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(
  MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);
// app.use('/images')
