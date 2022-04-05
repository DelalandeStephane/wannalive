
const User =  require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const {ObjectId} =require("mongodb");

exports.createPost = (req, res, next) => {
  const newPost = new Post({
    post :req.body.post,
    userID : new ObjectId(req.params.userId),
    createdAt : req.body.createdAt
  });
  newPost
  .save()
  .then(() => res.status(201).json({message : 'success'}))
  .catch(error => res.status(500).json({  error }));
 };

 exports.updatePost = (req, res, next) => {
    Post.findOneAndUpdate({_id : ObjectId(req.body.postId)},{'post' : req.body.value.post}).then((post) => {
      res.status(201).json(post);
    })
 };


 exports.getPost = (req,res, next) => {
   
   Post.aggregate([
    {$match: { _id : new ObjectId(req.params.postId) }},
    {$lookup: {
            from: "users",
            localField: "userID",
            foreignField: "_id",
            pipeline:[{$project : { userName:1 }}],
            as: "user"
        }}
  ]).then((posts) =>{
       res.status(201).json(posts);
     })
 }
 exports.getAllPost = (req, res, next) => {
   User.findById({_id : req.params.userId},{_id:0, contacts : 1}).then( contactsList => {
      const contactList = contactsList;

      Post.aggregate([
        {$match: { $or : [{ userID: {$in :  contactList.contacts} },{userID:  ObjectId(req.params.userId )}]} },

        {$lookup: {
                from: "users",
                localField: "userID",
                foreignField: "_id",
                pipeline:[{$project : { userName:1 }}],
                as: "user"
            }},
          {$sort : { createdAt : -1}}
      ]).then((posts) =>{
          res.status(201).json(posts);
      })
  })
 }

 exports.getAllUserPost = (req, res, next) => {
  Post.aggregate([
    {$match: { userID : new ObjectId(req.params.userId) }},
    {$lookup: {
            from: "users",
            localField: "userID",
            foreignField: "_id",
            pipeline:[{$project : { userName:1 }}],
            as: "user"
        }},
      {$sort : { createdAt : -1}}
  ]).then((posts) =>{
       res.status(201).json(posts);
     })
 };

 exports.deletePost = (req, res , next) => {
  Post.deleteOne({_id : ObjectId(req.body.postId)}).then(() => {
    Comment.deleteMany({postId : ObjectId(req.body.postId)}).then(() => {
      res.status(201).json();
    })
  }).catch(error => {
    res.status(400).json(error);
  })
}

 exports.sendLike = (req, res, next) => {

      const userId = ObjectId(req.body.userId);
      const postId = ObjectId(req.body.postId);
      const state = req.body.state ;
      let inc;
      let userLikedPost;
      if(state === "up"){
        inc = {$inc : {likeCount : 1}}
        userLikedPost = {$push: { likedPost: postId }}
      }else {
        inc = {$inc : {likeCount : -1}}
        userLikedPost = {$pull: { likedPost: postId }}
      }
      Post.updateOne(
        { _id: postId }, 
        inc
      ).then(() => {
        User.updateOne({_id : userId}, userLikedPost).then(() => {
          res.status(201).json();
        })
      }).catch(error => {
        res.status(400).json(error);
      })
 };