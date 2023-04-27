const mongoose = require("mongoose");
require('dotenv').config();
const connection = mongoose.connect("mongodb+srv://sitansumandal:smandal@cluster0.tobgf4t.mongodb.net/mockseven?retryWrites=true&w=majority");

module.exports = {
  connection,
};
