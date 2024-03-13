const User = require('../models/User');
const Category = require('../models/Category');
const Furniture = require('../models/Furniture');

exports.getAll = () => Furniture.find();

exports.getOne = (furnitureId) => Furniture.findById(furnitureId);

exports.getOneDetailed = (furnitureId) => this.getOne(furnitureId).populate('owner');

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

exports.like = async (userId, furnitureId) => {
    await Furniture.findByIdAndUpdate(furnitureId, { $push: { likedList: userId } })
};

exports.edit = (furnitureId, furnitureData) => Furniture.findByIdAndUpdate(furnitureId, furnitureData);

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId);

exports.search = async(name) => {

    const partialString = name;

    return await Furniture.find({ name: new RegExp(partialString, 'i') }).lean();
};