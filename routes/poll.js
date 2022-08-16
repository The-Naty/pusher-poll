const express = require("express");
const router = express.Router();

const Pusher = require("pusher");

const pusher = new Pusher({
  app_id: "1461010",
  key: "c2d7bcc41df5a6ff88f1",
  secret: "fc500a9a4e1fc18b494b",
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

  return res.json({ success: true, message: "Thank you for voting!!" });
});

module.exports = router;
