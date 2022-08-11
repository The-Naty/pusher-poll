const express = require("express");
const router = express.Router();

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1461010",
  key: "91f0a698584cb6326818",
  secret: "bc0039c8372f05a787b6",
  cluster: "eu",
  useTLS: true,
});

router.get("/", (req, res) => {
  res.send("POLL");
});

router.post("/", (req, res) => {
  pusher.trigger("food-poll", "food-vote", {
    points: 1,
    food: req.body.food,
  });

  return res.json({ success: true, message: "Thank you for voting!" });
});

module.exports = router;
