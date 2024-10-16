const Listing = require('../models/listing');
const User = require('../models/user');

// List agricultural items
// req.body: { title, desc, price, total_stock, images, location }
// res: listing
exports.createListing = async (req, res) => {
  const { title, desc, price, total_stock, images, location } = req.body;

  try {
    const listing = new Listing({
      title,
      desc,
      price,
      total_stock,
      images,
      location,
      owner: req.user._id
    });
    await listing.save();

    const user = await User.findById(req.user._id);
    user.my_listings.push(listing._id);
    await user.save();

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single listing by ID with details
// req.params: { id }
// res: listing
exports.getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('owner').exec();

    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all listings
// res: listings
exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('owner').exec();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
