const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const Admin = Schema({
  //Unique id created automatically by the mongoose
  userName:{ type: String, required: true, default : false},
  email:{ type: String, required: true, default : false, unique:true},
  password:{ type: String, required: true, default : false},
});



Admin.plugin(uniqueValidator);
module.exports = mongoose.model("admin", Admin);