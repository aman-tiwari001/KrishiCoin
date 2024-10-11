const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  basename: { type: String, required: true },
  phone: { type: String, required: true },
  my_donations: [{
    fundraiser: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser' },
    amount: { type: Number, required: true }
  }],
  my_fundraisers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser' }],
  my_listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
  my_order: [{
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true },
    delivery_location: { type: String, required: true },
    status: { type: Boolean, required: true, default: false }  // true: delivered and confirmed, false: not delivered
  }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
