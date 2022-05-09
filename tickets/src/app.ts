import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

// custom modules
import { errorHandler, NotFoundError } from "@nycgio-ticketsystem/common";

const app = express();

// allow proxying by nginx
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// error handlers
app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
