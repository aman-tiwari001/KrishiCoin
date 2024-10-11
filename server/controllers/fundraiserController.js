const Fundraiser = require('../models/fundRaiser');
const User = require('../models/user');

// Start a new fundraiser
// req.body: { title, desc, target_funds, deadline, images, project_id }
// res: fundraiser
exports.startFundraiser = async (req, res) => {
  const { title, desc, target_funds, deadline, images, project_id } = req.body;

  try {
    const fundraiser = new Fundraiser({ title, desc, target_funds, deadline, images, project_id });
    await fundraiser.save();
    const user = await User.findById(req.user._id);
    user.my_fundraisers.push(fundraiser._id);
    await user.save();

    res.json(fundraiser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Donate to fundraiser
// req.body: { fundraiser_id, amount }
// res: fundraiser
exports.donateToFundraiser = async (req, res) => {
  const { fundraiser_id, amount } = req.body;

  try {
    const fundraiser = await Fundraiser.findById(fundraiser_id);
    const user = await User.findById(req.user._id);

    fundraiser.donators.push({ user: user._id, amount_donated: amount });
    await fundraiser.save();

    user.my_donations.push({ fundraiser: fundraiser._id, amount });
    await user.save();

    res.json(fundraiser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single fundraiser by ID with donators details
// req.params: { id }
// res: fundraiser
exports.getFundraiser = async (req, res) => {
    try {
      const fundraiser = await Fundraiser.findById(req.params.id)
        .populate('donators.user', 'name wallet_address') 
        .exec();
  
      if (!fundraiser) return res.status(404).json({ message: 'Fundraiser not found' });
  
      res.json(fundraiser);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  