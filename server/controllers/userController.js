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
      { expiresIn: '1h' }
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
    const { id } = req.params;
    const user = await User.findById(id);
    const token = jwt.sign(
      { _id: user._id, wallet_address },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
