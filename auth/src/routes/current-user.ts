import express from "express";
import jwt from "jsonwebtoken";

import { currentUser } from "../middleware/current-user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.json({ success: true, user: req.user || null });
});

export { router as currentUserRouter };
