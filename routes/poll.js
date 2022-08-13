const express = require("express");
const router = express.Router();

const Pusher = require("pusher");

const pusher = new Pusher({
  app_id: "1461010",
  key: "eff0f06435b3cf81b22f",
  secret: "ef2b979e9699a977aeb9",
  cluster: "eu",
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
