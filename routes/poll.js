const express = require("express");
const router = express.Router();

const Pusher = require("pusher");

const pusher = new Pusher({
  app_id: "1461010",
  key: "1851a29afd5271013c5d",
  secret: "8247c3ae554d5bd77c72",
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
