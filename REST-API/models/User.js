const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid Email Address'],
        minLength: [10, 'Email should be at least 10 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [/^[a-zA-Z0-9]+$/, 'Password should be alphanumeric'],
        minLength: [4, 'Password is too short'],
    },
    // buyedList: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Stone'
    // }]
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;