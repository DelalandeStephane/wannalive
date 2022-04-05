
const User =  require("../models/User");
const Notif = require("../models/Notif");
const {ObjectId} =require("mongodb");
const notif = require("../models/Notif");
const userCtrl = require("../controllers/user");
const { findById } = require("../models/User");

exports.createNotif = (req, res, next) => { 
  User.findById(req.body.idApplicant,{_id:0, userName:1}).then(user => {
      const newNotif = {
    userID : new ObjectId(req.body.idRecipient),
    createdAt : req.body.createdAt,
    type : req.body.type,
    targetId : req.body.targetId,
    targetName : user.userName
  };

  if(req.body.type === "add-contact"){
    newNotif.content = "Vous a envoyé une demande d'ajout";
    newNotif.requestState = 'no-answer';
  }
  else if(req.body.type === "send-message"){
    newNotif.content = "Vous a envoyé un message";
  }

  Notif.create(newNotif).then(() => {
    res.status(201).json();
  })
  })

 };

 exports.getNotifs = (req,res,next) => {
  Notif.find({userID : ObjectId(req.params.id)},null,{sort:{createdAt :-1}}).then(notifList => {
      res.status(201).json(notifList);
  }).catch(error => {
    res.status(400).json(error);
  })

}

exports.getNoViewNotifs = (req,res,next) => {
  Notif.find({userID : ObjectId(req.params.id), checked : false}).then(notifList => {
      res.status(201).json(notifList);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.checkNotifs = (req,res,next) => {
  Notif.updateMany({userID : ObjectId(req.body.id), checked : false},{checked : true}).then(()=> {
      res.status(201).json();
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.checkChatNotifs = (req,res,next) => {  
  Notif.updateMany({userID : ObjectId(req.body.userId), checked : false, type:req.body.type, targetId : req.body.targetId },{checked : true}).then(()=> {
    Notif.find({userID : ObjectId(req.body.userId), checked : false}).then(listNotif => {
      res.status(201).json(listNotif);
    })
    
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.checkOneNotif = (req,res,next) => {
  Notif.updateOne({_id : ObjectId(req.body.id)},{checked : true}).then(()=> {
      res.status(201).json();
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.acceptContact = (req, res, next) => {
   // delete user from requestContact // update contact
    userCtrl.addContact(req.body)
    // update the notificationS
    Notif.findOneAndUpdate({_id: ObjectId(req.body.notifId)},{requestState : 'contact-accepted',content:'Vous avez accepté la demande'},{new: true}).then((notif) => {
      res.status(201).json(notif);
    })
}

exports.refuseContact = (req, res, next) => {
  // delete user from requestContact
   User.updateOne({ _id: req.body.idApplicant }, 
     {$pull: { request_contact: req.body.idRecipient }} ).then(() => {
        // update the notificationS
        Notif.findOneAndUpdate({_id: ObjectId(req.body.notifId)},{requestState : 'contact-refused',content:'Vous avez réfusé la demande'},{new: true}).then((notif) => {
          res.status(201).json(notif);
        })
     })
 
}


