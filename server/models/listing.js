const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true }, // price per 50kg
  total_stock: { type: Number, required: true }, // in kg
  images: { type: [String], required: true }, // Array of images
  location: { type: String, required: true },
  listing_id: { type: Number, required: true }
});

const Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;
