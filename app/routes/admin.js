const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const adminCtrl = require("../controllers/admin");

router.post("/sign-in",adminCtrl.signIn);
router.get("/get-all-users",auth,adminCtrl.getAllUsers);
router.get("/get-all-posts",auth,adminCtrl.getAllPosts);
router.get("/get-all-comments",auth,adminCtrl.getAllComments);
router.get("/get-all-chat-rooms",auth,adminCtrl.getAllChatRooms);
router.get("/get-all-messages-from-chat-room/:id",auth,adminCtrl.getAllMessagesFromChat);
router.post("/delete-user",auth,adminCtrl.deleteUser);
router.post("/delete-post",auth,adminCtrl.deletePost);
router.post("/delete-comment",auth,adminCtrl.deleteComment);
router.post("/delete-chat-room",auth,adminCtrl.deleteChatRoom);
router.post("/delete-message",auth,adminCtrl.deleteMessage);

module.exports = router;