const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  img: { type: String},
  name: { type: String},
  bio: { type: String},
  phone: { type: String},
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Usermodel = mongoose.model("user", userSchema);

module.exports = {
  Usermodel,
};
