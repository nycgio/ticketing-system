import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  // check for env variables
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Auth MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => console.log(`Server started on port 3000!`));
};

start();
