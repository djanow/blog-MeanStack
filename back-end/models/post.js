var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  profilepic: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Post', PostSchema);
