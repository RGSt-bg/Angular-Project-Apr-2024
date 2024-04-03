const router = require("express").Router();

const furnitureService = require("../services/furnitureService");
const { isAuth } = require("../middlewares/authMiddleware");
const { isProductOwner } = require("../middlewares/userMiddleware");
const { getErrorMessage } = require("../utils/errorUtil");
const { calledFromWhere, excludeCategory, addLocations } = require("../utils/furnitureUtils");
const Category = require("../models/Category");
const Furniture = require("../models/Furniture");
const { query } = require("express");

const mongoose = require("mongoose");

router.get("/categories", async (req, res) => {
  let categories = await furnitureService.getAllCategories().lean();
  categories = addLocations(categories);
// res.render("furniture/categories", { categories });
  res.send(categories);
});

router.get("/furnitureList", async (req, res) => {
  const calledFrom = req.query.calledFrom || "";
  const category = req.query.category || "";
  let furniture;
  let isNewTitle = "";
  let isNew = "";
  let noFurnitures = "";

  if (calledFrom === "category") {
    furniture = await furnitureService.getAllByCategory(category);
    furniture = furniture.map(doc => doc.toObject());
  }
  else if (calledFrom === "newProducts") {
    furniture = await furnitureService.getLatestFurnitures();
    // furniture = furniture.map(doc => doc.toObject());
  }
  else {
    furniture = await furnitureService.getAll().lean();
  }

  [isNew, noFurnitures, isNewTitle] = calledFromWhere(calledFrom, category);

  // res.render("furniture/furnitureList", { furniture, isNewTitle, isNew, noFurnitures });
  res.send(furniture);
});

router.get("/createCategory", async (req, res) => {
  res.render("furniture/createCategory");
});

router.post("/createCategory", async (req, res) => {
  const newCategory = req.body;

  try {
    await furnitureService.createCategory(newCategory);
    // res.render("furniture/createCategory");
    // res.send(newCategory);
    res.send({"message": "The category was created successfully!"});
  }
  catch (err) {
    console.log(err.message);
    res.render("furniture/createCategory", { error: getErrorMessage(err) });
  }
});

router.get("/createFurniture", async (req, res) => {
  const category = await furnitureService.getAllCategories().lean();
  // res.render("furniture/editCreate", { category, actionType: "Create" });
  res.send({ category, actionType: "Create" });
});

// router.post("/createFurniture", isAuth, async (req, res) => {
  router.post("/createFurniture", async (req, res) => {
  const newFurniture = req.body;
  const category = await furnitureService.getAllCategories().lean();
  const actionType = "Create";

  try {
  console.log('BE -> furnitureController -> before create');
    await furnitureService.create(newFurniture, { actionType });
    // await furnitureService.create(req.user._id, newFurniture, { actionType });
    // res.redirect("/furniture/furnitureList");
    res.send({"message": "The furniture was created successfully!"});
  }

  catch (err) {
    console.log(err.message);
    res.render("furniture/editCreate", {
      ...newFurniture,
      category,
      actionType: "Create",
      error: getErrorMessage(err),
    });
  }
});

router.get("/details/:furnitureId", async (req, res) => {
  const furnitureId = req.params.furnitureId;
  // const isLiker = await isStoneLiker(req, res);

  let isLoggedIn = false;
  if (req.cookies["auth"]) isLoggedIn = true;

  try {
    const furniture = await furnitureService.getOneDetailed(furnitureId).lean();
    const isOwner = furniture.owner?._id == req.user?._id;
    furniture.isOwner = isOwner; // Only for details page on front-end

    // res.render("furniture/details", { furniture, isOwner, isLoggedIn });
    res.send(furniture);
  }
  
  catch (err) {
    console.log(err.message);
    res.render("furniture/furnitureList", { error: getErrorMessage(err) });
  }
});

router.get("/edit/:furnitureId", isAuth, isProductOwner, async (req, res) => {
  let category = await furnitureService.getAllCategories().lean();
  const furnitureId = req.params.furnitureId;
  let furniture;

  let isLoggedIn = false;
  if (req.cookies["auth"]) isLoggedIn = true;

  try {
    furniture = await furnitureService.getOne(furnitureId).lean();
    category = await excludeCategory(furniture.category, category);

    res.render("furniture/editCreate", {
      furniture,
      category,
      actionType: "Edit",
    });
  } catch (err) {
    console.log(err.message);
    res.render("furniture/editCreate", {
      ...furniture,
      category,
      actionType: "Edit",
      error: getErrorMessage(err),
    });
  }
});

// Edit route for front-end
router.post("/edit/:furnitureId", async (req, res) => {
  const editedFurniture = req.body;

  try {
    await furnitureService.edit(req.params.furnitureId, editedFurniture);
    // res.redirect(`/furniture/details/${req.params.furnitureId}`);
    res.send({"message": "The furniture was edited successfully!"});
  } catch (err) {
    res.render(`furniture/editCreate/${req.params.furnitureId}`, {
      ...editedFurniture,
      error: getErrorMessage(err),
    });
  }
});

// Delete route for front-end
router.get("/delete/:furnitureId", async (req, res) => {
  const furnitureId = req.params.furnitureId || "";
  await furnitureService.delete(furnitureId);
  res.send({"message": "The furniture was deleted successfully!"});
});

// Search route for front-end
router.get("/search", async (req, res) => {
  const calledFrom = req.query.calledFrom || "";
  const searchString = req.query.searchString || "";

  try {
      const furniture = await furnitureService.search(searchString);
      res.send(furniture);
  }

  catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
  }
});

// Edit route for back-end
// router.post("/edit/:furnitureId", isAuth, async (req, res) => {
//   const editedFurniture = req.body;

//   try {
//     await furnitureService.edit(req.params.furnitureId, editedFurniture);
//     res.redirect(`/furniture/details/${req.params.furnitureId}`);
//   } catch (err) {
//     res.render(`furniture/editCreate/${req.params.furnitureId}`, {
//       ...editedFurniture,
//       error: getErrorMessage(err),
//     });
//   }
// });

// Delete route for back-end
// router.get("/delete/:furnitureId", isProductOwner, async (req, res) => {
//   const furnitureId = req.query.furnitureId || "";
//   await furnitureService.delete(furnitureId);
//   res.redirect("/furniture/furnitureList");
// });

// Search route for back-end
// router.get("/search", async (req, res) => {

//   try {
//       let isNewTitle = "";
//       let isNew = "";
//       let noFurnitures = "";
//       const name = req.query.search;
//       const calledFrom = req.query.calledFrom;
//       const furniture = await furnitureService.search(name);

//       [isNew, noFurnitures, isNewTitle] = calledFromWhere(calledFrom);

//       res.render("furniture/furnitureList", { furniture, isNewTitle, isNew, noFurnitures });
//   }

//   catch (err) {
//       console.error(err);
//       res.status(500).send("Server Error");
//   }
// });

module.exports = router;

// router.get("/like/:furnitureId", async (req, res) => {
//   const stoneId = req.params.stoneId;
//   const isLiker = await isStoneLiker(req, res);

//   let isLoggedIn = false;
//   if (req.cookies["auth"]) isLoggedIn = true;

//   try {
//     await stoneService.like(req.user._id, stoneId);
//     const stone = await stoneService.getOneDetailed(stoneId).lean();
//     const isOwner = stone.owner?._id == req.user?._id;

//     res.render("furniture/details", { stone, isOwner, isLoggedIn, isLiker });
//   } catch (err) {
//     console.log(err.message);
//     res.render("/furniture/dashboard", { error: getErrorMessage(err) });
//   }
// });
// =============================================================================
// async function isStoneLiker(req, res) {
//     const userId = req.user?._id;
//     const stoneId = req.params.stoneId;
//     const isLiker = await Stone.findOne({ likedList: userId, _id: stoneId });

//     if (!isLiker) {
//         return false;
//     };

//     return true;
// };
