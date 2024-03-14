const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: 4,
  },
  category: {
    // type: mongoose.Types.ObjectId,
    type: String,
    ref: "Category",
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    match: [/https?:\/\//, "Please, fill a valid HTTP address!"],
  },
  color: {
    type: String,
    required: false,
  },
  material: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 1,
    gt: 0,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: 20,
  },
  buyedList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;
