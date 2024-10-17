const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Create a new user
// req.body: { wallet_address, name, basename, phone }
// res: { token }
exports.connectWallet = async (req, res) => {
  const { wallet_address, name, basename, phone } = req.body;
  try {
    let user = await User.findOne({ wallet_address });
    if (!user) {
      user = new User({ wallet_address, name, basename, phone });
      await user.save();
    }
    const token = jwt.sign(
      { _id: user._id, wallet_address },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get user profile
// req.user: { _id, wallet_address }
// res: user
exports.getUser = async (req, res) => {
  try {
    const id = req.user._id;

    const user = await User.findById(id)
      .populate({
        path: 'my_order',
        populate: [
          {
            path: 'listing',
            select: 'images title desc location',
            model: 'Listing'
          },
          {
            path: 'buyer',
            select: 'name ',
            model: 'User'
          },
          {
            path: 'seller',
            select: 'name',
            model: 'User'
          }
        ]
      })
      .populate('my_listings')
      .populate('my_donations')
      .populate('my_fundraisers')
      .lean();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get user
// req.user: { wallet_address }
// res: {exist, user}
exports.checkUser = async (req, res) => {
  try {
    const { wallet_address } = req.query;
    const user = await User.findOne({ wallet_address });

    if (user) {
      const token = jwt.sign(
        { _id: user._id, wallet_address },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      return res.json({ exist: true, user, token });
    } else {
      return res.json({ exist: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
