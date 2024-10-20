const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  orderId: { type: Number, required: true },
  quantity: { type: Number, required: true },
<<<<<<< HEAD
  price: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'delivered'] }
});
=======
  price : { type: Number, required: true },
  status: { type: String, default: 'pending' , enum : ['pending', 'delivered'] }
} , { timestamps: true });
>>>>>>> a3e485057a34f07082c66390a64744ab511499a0

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
