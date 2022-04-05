const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const authCtrl = require("../controllers/auth");

router.post("/sign-up", authCtrl.signUp);
router.post('/sign-in', authCtrl.signIn);
router.get("/verify-email/:email", authCtrl.verifyEmail);

module.exports = router;