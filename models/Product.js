const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  images: [{ type: String }],
  quantity: { type: Number, default: 0 },
},{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);
