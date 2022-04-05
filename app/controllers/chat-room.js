
const User =  require("../models/User");
const ChatRoom = require("../models/ChatRoom");
const {ObjectId} =require("mongodb");


exports.createRoom = (req, res, next) => { 
  const userArray = [];
  req.body.userChat.forEach(user => {
    user.id = ObjectId(user.id);
      userArray.push(user);
  });
  const chatData = {
    usersChat : userArray,

  }
  ChatRoom.create(chatData).then((room) => {
    res.status(201).json(room);
  })
 };

 exports.getRoomsList = (req, res, next) => { 
    ChatRoom.find({'usersChat.id' : ObjectId(req.params.id)}).then((roomList) => {
      res.status(201).json(roomList);
    })
 };

 
 exports.getRoom = (req, res, next) => { 
  ChatRoom.findById({_id : req.params.id}).then((room) => {
    res.status(201).json(room);
  })
};

exports.sendMessage = (req, res, next) => {
  const roomId = req.body.roomId;
  const data = req.body.data; 
  ChatRoom.updateOne(
    { _id: roomId }, 
    { $push: { messages: data } }  
  ).then(() => {
    res.status(201).json();
  }).catch(error => {
    res.status(400).json(error);
  })
};

exports.deleteMessage = (req,res,next) => {
  ChatRoom.findOneAndUpdate({_id : ObjectId(req.body.chatId)},{$pull: { messages:{ _id :ObjectId(req.body.messageId) }}}).then((message) => {
      res.status(201).json(true);
  }).catch(error => {
    res.status(400).json(error);
  })
}

