import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  // check for env variables
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => console.log(`Server started on port 3000!`));
};

start();
