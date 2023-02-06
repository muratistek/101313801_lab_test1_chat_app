const mongoose = require('mongoose');

const GroupMessageSchema = new mongoose.Schema({
  from_user: {
    type: String,
    required: [true, "Provide from_user"],
    trim: true
  },
  room: {
    type: String,
    required: [true, "Provide room type"],
  },
  message: {
    type: String,
    required: [true, "Provide message"],
  },
  date_sent: {
    type: Date,
    default: Date.now
  }
})

const GroupMessage = mongoose.model('GroupMessage', GroupMessageSchema)
module.exports = GroupMessage