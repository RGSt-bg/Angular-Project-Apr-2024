const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: 4,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        minLength: 3,
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        match: [/https?:\/\//, 'Please, fill a valid HTTP address!'],
    },
    color: {
        type: String,
        required: false,
        minLength: 2,
    },
    material: {
        type: String,
        required: false,
        minLength: 3,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 1,
        gt: 0,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: 20,
    },
    buyedList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture;