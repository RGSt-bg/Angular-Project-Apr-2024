const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required'],
        minLength: 3,
    },
    imageCategory: {
        type: String,
        required: [true, "Image is required"],
        match: [/https?:\/\//, "Please, fill a valid HTTP address!"],
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;