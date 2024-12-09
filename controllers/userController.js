// controllers/userController.js
const User = require('../models/User');
const Order = require('../models/Order');
const Trip = require('../models/Trip');
const Bike = require('../models/Bike');

// Function to get user details
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you are using JWT or session-based authentication
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get bikes rented by the user (only completed orders)
    const rentedBikes = await Order.find({ user: userId, status: 'Completed' }).populate('bike');
    
    // Get trips booked by the user
    const bookedTrips = await Trip.find({ 'user': userId });  // assuming the Trip model has a 'user' field

    // Get purchased bikes by the user (same as rented bikes with status 'Completed')
    const purchasedBikes = await Order.find({ user: userId, status: 'Completed' }).populate('bike');

    res.status(200).json({
      user,
      rentedBikes,
      bookedTrips,
      purchasedBikes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
