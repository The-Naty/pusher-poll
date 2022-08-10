const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

const poll = require("./routes/poll");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cors());

app.use("/poll", poll);

const port = 3000;

app.listen(port, () => console.log(`Server started on ${port}`));
