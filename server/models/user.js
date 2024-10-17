const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  basename: { type: String, required: true },
  phone: { type: String, required: true },
  my_donations: [
    {
      fundraiser: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser' },
      amount: { type: Number, required: true }
    }
  ],
  my_fundraisers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser' }],
  my_listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
  my_order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
