const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true }, // price per 50kg
  total_stock: { type: Number, required: true }, // in multiples of 50 kg
  images: { type: [String], required: true }, // Array of images
  location: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orders: [
    {
      order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
    }
  ],
  sold_stock: { type: Number, default: 0 }
});

const Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;
