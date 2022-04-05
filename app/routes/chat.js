const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const chatRoom = require("../controllers/chat-room");

router.post("/create-room",auth,chatRoom.createRoom);
router.post("/send-message",auth, chatRoom.sendMessage);
router.get("/get-rooms-list/:id",auth, chatRoom.getRoomsList);
router.get("/get-room/:id",auth, chatRoom.getRoom);
router.post("/delete-message/:verifyId",auth,chatRoom.deleteMessage);

module.exports = router;