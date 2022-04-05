const express = require("express");
const app = express();
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');
// Connecting to the database
mongoose
  .connect('mongodb+srv://stephane:RR4cr8mGT3tX1XAj@cluster0.hxno3.mongodb.net/wannalive?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to the database");
  })
  .catch((err) => {
    console.log("The server cannot connect to the database "+err);
    process.exit();
  });
  

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    next();
});

app.use(express.static(__dirname + "/dist/wannalive"));

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname+'/dist/wannalive/index.html'));
})

app.use('/assets/image', express.static(path.join(__dirname, 'assets/image')));
app.use(cors())
app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const notifRoutes = require("./routes/notif");
const chatRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");

app.options('*', cors()); 
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notif", notifRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);



module.exports = app;