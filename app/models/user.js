const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const User = Schema({
  //Unique id created automatically by the mongoose
  userCategory: { type: String, required: true, default : false},
  userName:{ type: String, required: true, default : false},
  userSubcategory: { type: String, required: true, default : false},
  userDescription:{ type: String, required: false, default : false},
  department:{ type: String, required: true, default : false},
  region:{type: String, required: true, default : false},
  email:{ type: String, required: true, default : false, unique:true},
  phoneNumber: { type: String, required: false, default : false},
  website:{ type: String, required: false, default : false},
  password:{ type: String, required: true, default : false},
  facebookLink:{ type: String, required: false, default : false},
  twitterLink:{ type: String, required: false, default : false},
  instagramLink:{ type: String, required: false, default : false},
  youtubeLink:{ type: String, required: false, default : false},
  spotifyLink:{ type: String, required: false, default : false},
  deezerLink:{ type: String, required: false, default : false},
  contacts:{ type: [Schema.Types.ObjectId], required: false},
  request_contact:{ type: [Schema.Types.ObjectId], required: false},
  likedPost : { type: [Schema.Types.ObjectId], required: false},
  roomResponseCount : { type : Number, required : false},
});

User.plugin(uniqueValidator);
module.exports = mongoose.model("user", User);