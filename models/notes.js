// Require mongoose
var mongoose = require("mongoose");
var db = require("../config/connections");


var Schema = mongoose.Schema;

var noteSchema = new Schema({
  // Just a string
  title: {
    type: String
  },
  // Just a string
  body: {
    type: String
  }
});


// Create and export
var notes = mongoose.model("notes", noteSchema);
module.exports = notes;