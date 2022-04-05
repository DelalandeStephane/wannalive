const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const Localisation = Schema({
  //Unique id created automatically by the mongoose
  num_dep: { type: Number, required: true, default : false},
  dep_name: { type: String, required: true, default : false},
  region_name: { type: String, required: true, default : false},
});

Localisation.plugin(uniqueValidator);
module.exports = mongoose.model("localisation", Localisation);