import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

// custom modules
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@nycgio-ticketsystem/common";

// routes
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";

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
app.use(currentUser);

// use routes
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);

// error handlers
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
