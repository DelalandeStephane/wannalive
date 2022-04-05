
const User =  require("../models/User");
const Comment = require("../models/Comment");
const {ObjectId} =require("mongodb");

exports.createComment = (req, res, next) => {
  const newComment = new Comment({
    content :req.body.content,
    postId :  ObjectId(req.body.postId),
    userId :  ObjectId(req.body.userId),
    createdAt : req.body.createdAt
  });
  newComment
  .save()
  .then(() => res.status(201).json({message : 'success'}))
  .catch(error => {
    res.status(500).json({  error }) 
  });
 };

 exports.deleteComment = (req, res , next) => {
    Comment.deleteOne({_id : ObjectId(req.body.commentId)}).then(() => {
      res.status(201).json();
    }).catch(error => {
      res.status(400).json(error);
    })
 }

exports.getComments = (req, res, next) => {
  Comment.aggregate([
    {$match: { postId : new ObjectId(req.params.postId) }},
    {$lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            pipeline:[{$project : { _id:0, userName:1 }}],
            as: "user"
        }},
      {$sort : { createdAt : -1}},
      {$limit : Number(req.params.limit)}
  ]).then((posts) =>{
       res.status(201).json(posts);
     })
 };

 exports.getCommentsCount = (req, res, next) => {
  Comment.count({postId: req.params.postId}).then(count => {
    res.status(201).json(count);
  })

 }

