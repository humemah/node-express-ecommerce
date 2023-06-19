const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add a virtual field for the total price
cartSchema.virtual('totalPrice').get(function() {
  return this.items.reduce((total, item) => {
    const productPrice = item.product.price;
    const quantity = item.quantity;
    return total + productPrice * quantity;
  }, 0);
});

module.exports = mongoose.model('Cart', cartSchema);
