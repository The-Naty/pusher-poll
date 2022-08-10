const express = require("express");
const router = express.Router();

const Pusher = require("pusher");

router.get("/", (req, res) => {
  res.send("POLL");
});

router.post("/", (req, res) => {
  pusher.trigger("food-poll", "food-poll", {
    points: 1,
    food: req.body.food,
  });

  return res.json({ success: true, message: "Thank you for voting!" });
});

module.exports = router;
