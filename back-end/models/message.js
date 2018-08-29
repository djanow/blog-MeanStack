var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date
  }
});

module.exports = mongoose.model('Message', MessageSchema);
