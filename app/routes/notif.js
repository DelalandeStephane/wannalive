const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const notifCtrl = require("../controllers/notif");


router.post("/create-notif/",auth,notifCtrl.createNotif);
router.post("/check-notifs",auth,notifCtrl.checkNotifs);
router.post("/check-chat-notifs",auth,notifCtrl.checkChatNotifs);
router.post("/check-one-notif",auth,notifCtrl.checkOneNotif);
router.post("/accept-contact/",auth,notifCtrl.acceptContact);
router.post("/refuse-contact/",auth,notifCtrl.refuseContact);
router.get("/get-notif/:id",auth,notifCtrl.getNotifs);
router.get("/get-notif-not-view/:id",auth,notifCtrl.getNoViewNotifs);
module.exports = router;