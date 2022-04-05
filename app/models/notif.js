const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const Notif = Schema({
  //Unique id created automatically by the mongoose
  userID: { type: Schema.Types.ObjectId, required: true},
  content: { type: String, required: true, default : false},
  type: { type: String, required: true, default : false},
  targetId : { type: Schema.Types.ObjectId, required: true},
  targetName : { type: String, required: true},
  checked : { type: Boolean, required: true, default : false},
  requestState : { type: String, required: false}, // for contact request
  createdAt: { type: Date, required: true, default :false},
});

Notif.plugin(uniqueValidator);
module.exports = mongoose.model("notif", Notif);