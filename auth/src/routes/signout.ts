import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;

  res.json({ success: true });
});

export { router as signoutRouter };
