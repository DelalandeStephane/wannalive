const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const Comment = Schema({
  //Unique id created automatically by the mongoose
  postId: { type: Schema.Types.ObjectId, required: true},
  userId: { type: Schema.Types.ObjectId, required: true},// user  send comment
  content: { type: String, required: true, default : false},
  createdAt: { type: Date, required: true, default :false},
});

Comment.plugin(uniqueValidator);
module.exports = mongoose.model("comment", Comment);