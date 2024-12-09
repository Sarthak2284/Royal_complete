const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  sellingPrice: { type: Number, required: true, min: 0 },
  rentalPricePerDay: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, default: 0, min: 0 },
  imageUrl: { type: String, required: true },  
});


const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
