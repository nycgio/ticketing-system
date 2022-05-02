import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req, res) => {
  res.json({ success: true, route: "signin" });
});

export { router as signinRouter };
