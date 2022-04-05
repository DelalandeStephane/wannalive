const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const messageType = Schema({
  content:{ type: String, required: true},
  emitterUser:{ type: Schema.Types.ObjectId, required: true},
  emitterName : { type: String, required: true},
  createdAt: { type: Date, required: true},
})

const userChatType = Schema({
  id:{ type: Schema.Types.ObjectId, required: true},
  name:{ type: String, required: true},
},{ _id : false })



const ChatRoom = Schema({
  //Unique id created automatically by the mongoose
  usersChat:{ type: [userChatType], required: true},
  messages:{ type: [messageType], required: false},

});

ChatRoom.plugin(uniqueValidator);
module.exports = mongoose.model("chat_room", ChatRoom);