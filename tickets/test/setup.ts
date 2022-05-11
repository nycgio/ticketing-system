import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../src/app";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_SECRET = "test";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  // Build a session object
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode is as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // Return a string as the cookie with encoded data
  return [`session=${base64}`];
};
