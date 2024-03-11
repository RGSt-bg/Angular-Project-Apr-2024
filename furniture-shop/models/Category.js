const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required'],
        minLength: 3,
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;