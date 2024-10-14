const mongoose = require('mongoose');

const FundraiserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  target_funds: { type: Number, required: true },
  deadline: { type: Date, required: true },
  images: { type: [String], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  donators: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount_donated: { type: Number, required: true }
    }
  ]
});

const Fundraiser = mongoose.model('Fundraiser', FundraiserSchema);
module.exports = Fundraiser;
