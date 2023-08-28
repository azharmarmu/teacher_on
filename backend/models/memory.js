const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  title: String,
  description: String,
  eventDate: Date,
  tags: [String],
  image: String,
  lastReminderSent: Date,
});

const Memory = mongoose.model('Memory', memorySchema);
module.exports = Memory;
