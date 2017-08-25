// Require mongoose
var mongoose = require("mongoose");
var db = require("../config/connections");

var Schema = mongoose.Schema;


var articleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "notes"
  }
});

// Create and export
var articles = mongoose.model("articles",articleSchema);
module.exports = articles;