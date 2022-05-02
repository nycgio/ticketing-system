import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.json({ success: true, route: "sign out" });
});

export { router as signoutRouter };
