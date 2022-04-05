const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const Picture = Schema({
  //Unique id created automatically by the mongoose
  userID: { type: Schema.Types.ObjectId, required: true},
  name: { type: String, required: true, default : false},
  type: { type: String, required: true, default : false},
});

Picture.plugin(uniqueValidator);
module.exports = mongoose.model("picture", Picture);