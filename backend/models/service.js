const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }, // e.g., "30 mins"
  description: { type: String },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
