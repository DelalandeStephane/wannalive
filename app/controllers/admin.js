const Admin = require('../models/Admin')
const User =  require("../models/User");
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const ChatRoom = require('../models/ChatRoom')
const {ObjectId} =require("mongodb");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");



exports.signIn = (req, res, next) => {
  
  Admin.findOne({email:req.body.email})
  .then(admin => {
    if(!admin) {
      return res.status(401).json({ error:'Utilisateur non trouvé'})
    }

    bcrypt.compare(req.body.password, admin.password)
    .then( valid => {
      if(!valid){
        return res.status(401).json({ error:'Identifiant incorrect'})
      }
      res.status(200).json({
        userId: admin._id,
        userName: admin.userName,
        userStatus : 'admin',
        token: jwt.sign(
          {
            userId: admin._id,
            userStatus : 'admin'
          },
          'RANDOM_TOKEN_SECRET',
          { expiresIn:'24h' }
        )
      });
    })
    .catch(error => { res.status(500).json({ error}) })
  })
  .catch( error => res.status(500).json({ error }));
}


 exports.getAllUsers = (req,res,next) => {
  User.find({},null,{sort:{createdAt :-1}}).then(users => {
      res.status(201).json(users);
  }).catch(error => {
    res.status(400).json(error);
  })

}

exports.deleteUser = (req,res,next) => {
  User.deleteOne({_id : req.body.id}).then(() => {
      res.status(201).json(true);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.getAllPosts = (req,res,next) => {
  Post.find({},null,{sort:{createdAt :-1}}).then(posts => {
      res.status(201).json(posts);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.deletePost = (req,res,next) => {
  Post.deleteOne({_id : req.body.id}).then(() => {
      res.status(201).json(true);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.getAllComments = (req,res,next) => {
  Comment.find({},null,{sort:{createdAt :-1}}).then(comments => {
      res.status(201).json(comments);
  }).catch(error => {
    res.status(400).json(error);
  })

}

exports.deleteComment = (req,res,next) => {
  Comment.deleteOne({_id : req.body.id}).then(() => {
      res.status(201).json(true);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.getAllChatRooms = (req,res,next) => {
  ChatRoom.find({},null,{sort:{createdAt :-1}}).then(chatRooms => {
      res.status(201).json(chatRooms);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.deleteChatRoom = (req,res,next) => {
  ChatRoom.deleteOne({_id : req.body.id}).then(() => {
      res.status(201).json(true);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.getAllMessagesFromChat = (req,res,next) => {
  ChatRoom.find({_id : req.params.id},{_id:0, messages : 1}).then(chatRoom => {
      res.status(201).json(chatRoom[0].messages);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.deleteMessage = (req,res,next) => {
  ChatRoom.findOneAndUpdate({_id : ObjectId(req.body.chatId)},{$pull: { messages:{ _id :ObjectId(req.body.messageId) }}}).then((message) => {
      res.status(201).json(true);
  }).catch(error => {
    res.status(400).json(error);
  })
}

