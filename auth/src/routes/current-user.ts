import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.json({ success: true, route: "current user" });
});

export { router as currentUserRouter };
