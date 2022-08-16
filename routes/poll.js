const express = require("express");
const router = express.Router();

const Vote = require("../models/Vote");

const Pusher = require("pusher");

const keys = require("../config/keys");

var pusher = new Pusher({
  appId: keys.pusherAppId,
  key: keys.pusherKey,
  secret: keys.pusherSecret,
  cluster: keys.pusherCluster,
});

router.get("/", (req, res) => {
  Vote.find().then((votes) => res.json({ success: true, votes: votes }));
});

router.post("/", (req, res) => {
  const newVote = {
    food: req.body.food,
    points: 1,
  };

  new Vote(newVote).save().then((vote) => {
    pusher.trigger("food-poll", "food-vote", {
      points: parseInt(vote.points),
      food: vote.food,
    });

    return res.json({ success: true, message: "Thank you for voting" });
  });
});

module.exports = router;
