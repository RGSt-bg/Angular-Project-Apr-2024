const User = require('../models/User');
const Category = require('../models/Category');
const Furniture = require('../models/Furniture');

exports.getAll = () => Furniture.find();

exports.getOne = (stoneId) => Furniture.findById(stoneId);

// exports.getOneDetailed = (stoneId) => this.getOne(stoneId).populate('owner');

exports.createCategory = async (categoryData) => {
    const addedCategory = await Category.create(categoryData);
};

exports.getAllCategories = () => Category.find();

exports.create = async (userId, furnitureData) => {
    const addedFurniture = await Furniture.create({
        owner: userId,
        ...furnitureData
    });

    await User.findByIdAndUpdate(userId, { $push: { buyedList: addedFurniture._id } })
};

exports.like = async (userId, stoneId) => {
    await Stone.findByIdAndUpdate(stoneId, { $push: { likedList: userId } })
};

exports.edit = (stoneId, stoneData) => Stone.findByIdAndUpdate(stoneId, stoneData);

exports.delete = (stoneId) => Stone.findByIdAndDelete(stoneId);

exports.search = async(name) => {

    const partialString = name;

    return await Stone.find({ name: new RegExp(partialString, 'i') }).lean();
};