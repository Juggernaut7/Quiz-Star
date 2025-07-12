const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  score: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Score', scoreSchema);
