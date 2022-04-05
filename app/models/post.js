const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const Post = Schema({
  //Unique id created automatically by the mongoose
  userID: { type: Schema.Types.ObjectId, required: true},
  post: { type: String, required: true, default : false},
  createdAt: { type: Date, required: true, default :false},
  likeCount : {type: Number, required: true, default : 0}
});

Post.plugin(uniqueValidator);
module.exports = mongoose.model("post", Post);