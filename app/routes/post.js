const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");


router.post("/create-post/:userId",auth,postCtrl.createPost);
router.post("/update-post",auth,postCtrl.updatePost);
router.get("/get-all-user-posts/:userId",auth,postCtrl.getAllUserPost);
router.get("/get-all-posts/:userId",auth,postCtrl.getAllPost);
router.get("/get-post/:postId",auth,postCtrl.getPost);
router.delete("/delete-post",auth,postCtrl.deletePost);


router.post("/send-like/",auth,postCtrl.sendLike);


router.post("/create-comment/",auth,commentCtrl.createComment);
router.get("/get-comments/:postId/:limit",auth,commentCtrl.getComments);
router.get("/get-comments-count/:postId",auth,commentCtrl.getCommentsCount);
router.delete("/delete-comment/",auth,commentCtrl.deleteComment);
module.exports = router;