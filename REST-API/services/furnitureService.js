const User = require("../models/User");
const Category = require("../models/Category");
const Furniture = require("../models/Furniture");

exports.getAll = () => Furniture.find();

exports.getOne = (furnitureId) => Furniture.findById(furnitureId);

exports.getOneDetailed = (furnitureId) => this.getOne(furnitureId).populate("owner");

exports.createCategory = async (categoryData) => await Category.create(categoryData);

exports.getAllCategories = () => Category.find();

exports.getAllByCategory = async (category) => {
  try {
    return await Furniture.find({ category: category });
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

exports.getLatestFurnitures = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await Furniture.find({
      createdAt: { $gte: thirtyDaysAgo },
    });
    
// const temp = await Furniture.find({createdAt: { $gte: thirtyDaysAgo },});
// console.log(temp);
// return temp;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

exports.create = async (userId, furnitureData) => {
  const addedFurniture = await Furniture.create({
    owner: userId,
    ...furnitureData,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { buyedList: addedFurniture._id },
  });
};

exports.edit = (furnitureId, furnitureData) => Furniture.findByIdAndUpdate(furnitureId, furnitureData);

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId);

exports.search = async (name) => {
  const partialString = name;
  const nameRegex = new RegExp(partialString, "i");
  const categoryRegex = new RegExp(partialString, "i");
  
  try {
    const furniture = await Furniture.find({
      $or: [
        { name: { $regex: nameRegex } },
        { category: { $regex: categoryRegex } },
      ],
    }).lean();
    
    return furniture;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// exports.like = async (userId, furnitureId) => {
//     await Furniture.findByIdAndUpdate(furnitureId, { $push: { likedList: userId } })
// };
