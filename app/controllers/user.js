
const User =  require("../models/User");
const Picture = require("../models/Picture");
const {ObjectId} =require("mongodb");
const bcrypt = require("bcrypt");
var generator = require('generate-password');

exports.getUserAvatar = (req, res, next) => {
 const id = req.params.id;
  Picture.findOne({userID : id, type : 'avatar'})
  .then((avatar) =>{
    res.status(201).json(avatar);
  })
  .catch((error) => {
    res.status(500).json(error);
  })
};

exports.getUserBackground = (req, res, next) => {
  const id = req.params.id;
   Picture.findOne({userID : id, type : 'background'})
   .then((background) =>{
     res.status(201).json(background);
   })
 };

exports.uploadAvatar = (req, res, next) => {
  const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

  const name = req.body.filename;
  const extension = MIME_TYPES[req.body.ext];

  const picture = {
    userID: ObjectId( req.params.verifyId),
    name:name +'.'+ extension,
    type:'avatar' 
  };

  Picture.updateOne({userID: req.params.verifyId, type: 'avatar'},picture,{upsert : true})
  .then(res.status(201).json())
  .catch();
}

exports.uploadBackground = (req, res, next) => {
  const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

  const name = req.body.filename;
  const extension = MIME_TYPES[req.body.ext];
  const picture = {
    userID: ObjectId( req.params.user),
    name:name +'.'+ extension,
    type:'background' 
  };

  Picture.updateOne({userID: req.params.user, type: 'background'},picture,{upsert : true})
  .then(res.status(201).json())
  .catch();
}

exports.getUser = (req, res, next) => {
  const id = req.params.id;
  User.findOne({_id:id}).then((user) => {
    user.password = undefined;
    if (user.userCategory === "artist"){
      user.userCategory = "Artiste / Groupe";
    }else if(user.userCategory === "Event-organizer") {
      user.userCategory = "Organisateur";
    }
    res.status(200).json(user);
  })
  .catch((error) => {
    res.status(400).json({
      error: error,
    });
  });
}

exports.getAllUser = (req, res, next) => {

  User.findById({_id: req.params.id},{_id:0, contacts:1}).then(contactList => {

    let pipeline = [
      {$match: { _id :  { $not : { $eq : ObjectId(req.params.id)}} } },
      {$match: { _id :  { $nin :  contactList.contacts } } },
    ];
     const userQuery = req.body;
     if(userQuery.region){
       pipeline.push({$match: { region :  userQuery.region }  })
     }
     if(userQuery.department){
       pipeline.push({$match: { department :  userQuery.department }  })
     }
     if(userQuery.category){
       pipeline.push({$match: { userCategory :  userQuery.category }}  )
     }
     if(userQuery.subcategory){
       pipeline.push({$match: { userSubcategory :  userQuery.subcategory }}  )
     }
     if(userQuery.username){
       pipeline.push({$match: { userName :  {$regex : userQuery.username, $options: 'i'} }  })
     }
   
    User.aggregate(pipeline).then(users => {
      users.forEach((user) => {
        if (user.userCategory === "artist"){
          user.userCategory = "Artiste / Groupe";
        }else if(user.userCategory === "Event-organizer") {
          user.userCategory = "Organisateur";
        }
      })
      res.status(201).json(users)
    })
    .catch(error => {
      res.status(400).json(error);
    })

  })


}

exports.updateUser = (req,res,next) =>{
  User.findOneAndUpdate({id: req.params.id}, req.body).then(() =>{
    res.status(201).json({success : ' top'})
  }).catch(err => {
    res.status('400').json(error);
  })
}

exports.addContact = (data) =>{
    if(data.idApplicant && data.idRecipient){
      const idApplicant = ObjectId(data.idApplicant);
      const idRecipient = ObjectId(data.idRecipient);
      User.updateOne(
        { _id: idApplicant }, 
        { $push: { contacts: idRecipient }, $pull: { request_contact: idRecipient } }, 
      ).then(() => {
        User.updateOne(
          { _id: idRecipient }, 
          { $push: { contacts: idApplicant } }  
        ).then(() => {
          next()
        }).catch(error => {
        })

      }).catch(error => {
      })
    }
   
}

exports.addRequestContact = (req,res,next) =>{
  if(req.body.targetId){
    const userId = ObjectId(req.body.userId);
    const targetId = ObjectId(req.body.targetId);
    User.updateOne(
      { _id: userId }, 
      { $push: { request_contact: targetId } }  
    ).then(() => {
      res.status(201).json();
    }).catch(error => {
      res.status(400).json(error);
    })
  }
}

exports.deleteContact = (req,res,next) =>{
  if(req.body.idApplicant && req.body.idRecipient){
    const idApplicant = req.body.idApplicant;
    const idRecipient = req.body.idRecipient;
    User.updateOne(
      { _id: idApplicant }, 
      { $pull: { contacts: idRecipient } }  
    ).then((user) => {
      User.updateOne(
        { _id: idRecipient }, 
        { $pull: { contacts: idApplicant } }  
      ).then(() => {
        res.status(201).json({success : ' top'})
      }).catch(error => {
        res.status(400).json(error);
      })

    }).catch(error => {
      res.status(400).json(error);
    })
  }
}

exports.getContactList = (req,res,next) => {
  User.findById(req.params.id,{_id: 0, contacts : 1}).then(contactList => {
    res.status(201).json(contactList);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.getContactsFromList = (req, res, next) => {
  User.findById(req.params.id,{_id: 0, contacts : 1}).then(contactListId => {
    User.find({ _id: { $in: contactListId.contacts } }).then(contactsListObj =>{

      contactsListObj.forEach((user) => {
        if (user.userCategory === "artist"){
          user.userCategory = "Artiste / Groupe";
        }else if(user.userCategory === "Event-organizer") {
          user.userCategory = "Organisateur";
        }
      })
      res.status(201).json(contactsListObj);
    })
  
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.getContactCount = (req,res,next) => {
  User.findById(req.params.id,{_id: 0, contacts : 1}).then(contactListId => {
     contactListId.contacts 
      res.status(201).json(contactListId.contacts.length );
  }).catch(error => {
    res.status(400).json(error);
  })

}

exports.getRequestContactList = (req,res,next) => {
  User.findById(req.params.id,{_id: 0, request_contact : 1}).then(requestContactList => {
    res.status(201).json(requestContactList);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.getLikedPostByUser = (req,res,next) => {
  User.findById(req.params.id,{_id: 0, likedPost : 1}).then(likedPost => {
    res.status(201).json(likedPost);
  }).catch(error => {
    res.status(400).json(error);
  })
}

exports.verifyPassword = (req, res, next) => {
  const id = req.params.id;
   User.findById({_id : id},{_id:0 , password: 1})
   .then((user) =>{
    bcrypt.compare(req.body.password, user.password)
    .then( valid => {
      res.status(201).json(valid);
    })
     
   })
 };

 
exports.updatePassword = (req, res, next) => {
  const id = req.body.id;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.updateOne({_id : ObjectId(id)},{password : hash}).then(() => {
      res.status(201).json(true);
    })
  })
 

 };

 exports.forgetPassword = (req, res, next) => {
    const email = req.body.email;
    const newPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    bcrypt.hash(newPassword, 10).then((hash) => {
      User.findOneAndUpdate({email : email},{password : hash}, ).then((user) => {
        if(user){
          req.body.newPassword = newPassword;
          req.body.userName = user.userName;
          next();
          res.status(201).json(true);
        }
        else {
          res.status(404).json(false);
        }
        

       
      })
    })



 };