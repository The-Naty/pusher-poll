const mongoose = require("mongoose");
const keys = require("./keys");

mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
