const router = require('express').Router();

const furnitureService = require('../services/furnitureService');
const { isAuth } = require('../middlewares/authMiddleware');
const { isProductOwner } = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utils/errorUtil');
const Category = require('../models/Category');
const Furniture = require('../models/Furniture');
const { query } = require('express');

router.get('/furnitures', async (req, res) => {
    const furniture = await furnitureService.getAll().lean();
    res.render('furniture/furnitures', { furniture });
});

router.get('/furnitureList', async (req, res) => {
    const furniture = await furnitureService.getAll().lean();
    const calledFrom = req.query.calledFrom || '';

    let isNewTitle = '';
    let isNew = '';

    if (calledFrom === 'newProducts') {
        isNew = 'new';
        isNewTitle = 'New';
    }
    else {
        isNew = '';
        isNewTitle = 'Our';
    }
        res.render('furniture/furnitureList', { furniture, isNewTitle, isNew });
});

router.get('/createCategory', async (req, res) => {
    res.render('furniture/createCategory');
});

router.post('/createCategory', async (req, res) => {

    const newCategory = req.body;
    try {
        await furnitureService.createCategory(newCategory);
        res.render('furniture/createCategory');

    } catch (err) {
        console.log(err.message);
        res.render('furniture/createCategory', { error: getErrorMessage(err) });
    }
});

router.get('/create', async (req, res) => {
    const category = await furnitureService.getAllCategories().lean();
    res.render('furniture/editCreate', { category, actionType: 'Create' });
});

router.post('/create', isAuth, async (req, res) => {
    const newFurniture = req.body;
    const category = await furnitureService.getAllCategories().lean();
    const actionType = 'Create';

    try {
        await furnitureService.create(req.user._id, newFurniture, { actionType });

        res.redirect('/furniture/furnitureList');

    } catch (err) {
        console.log(err.message);
        res.render('furniture/editCreate', { ...newFurniture, category, actionType: 'Create', error: getErrorMessage(err) });
    }
});

router.get('/details/:furnitureId', async (req, res) => {
    const furnitureId = req.params.furnitureId;
    // const isLiker = await isStoneLiker(req, res);

    let isLoggedIn = false;
    if (req.cookies['auth']) isLoggedIn = true;

    try {
        const furniture = await furnitureService.getOneDetailed(furnitureId).lean();
        const isOwner = furniture.owner?._id == req.user?._id;

        res.render('furniture/details', { furniture, isOwner, isLoggedIn });
    }
    catch (err) {
        console.log(err.message);
        res.render('furniture/furnitureList', { error: getErrorMessage(err) });
    }
});

router.get('/edit/:furnitureId', isAuth, isProductOwner, async (req, res) => {

    let category = await furnitureService.getAllCategories().lean();
    const furnitureId = req.params.furnitureId;
    let furniture;
    
    let isLoggedIn = false;
    if (req.cookies['auth']) isLoggedIn = true;
    
    try {
        furniture = await furnitureService.getOne(furnitureId).lean();
        category = await excludeCategory(furniture.category, category);

        res.render('furniture/editCreate', { furniture, category, actionType: 'Edit' });
    }
    catch (err) {
        console.log(err.message);
        res.render('furniture/editCreate', { ...furniture, category, actionType: 'Edit', error: getErrorMessage(err) });
    }
});

router.post('/edit/:furnitureId', isAuth, async (req, res) => {
    const editedFurniture = req.body;

    try {
        await furnitureService.edit(req.params.furnitureId, editedFurniture);
        res.redirect(`/furniture/details/${req.params.furnitureId}`);
    }
    catch (err) {
        res.render(`furniture/editCreate/${req.params.furnitureId}`, { ...editedFurniture, error: getErrorMessage(err) });
    }
});

router.get('/like/:furnitureId', async (req, res) => {

    const stoneId = req.params.stoneId;
    const isLiker = await isStoneLiker(req, res);

    let isLoggedIn = false;
    if (req.cookies['auth']) isLoggedIn = true;

    try {
        await stoneService.like(req.user._id, stoneId)
        const stone = await stoneService.getOneDetailed(stoneId).lean();
        const isOwner = stone.owner?._id == req.user?._id;

        res.render('furniture/details', { stone, isOwner, isLoggedIn, isLiker });
    }
    catch (err) {
        console.log(err.message);
        res.render('/furniture/dashboard', { error: getErrorMessage(err) });
    }
});

router.get('/delete/:furnitureId', isProductOwner, async (req, res) => {
console.log('In delete route');
    await furnitureService.delete(req.params.furnitureId);
console.log('After delete action');
    res.redirect('/furniture/furnitureList');
});

// async function isStoneLiker(req, res) {
//     const userId = req.user?._id;
//     const stoneId = req.params.stoneId;
//     const isLiker = await Stone.findOne({ likedList: userId, _id: stoneId });

//     if (!isLiker) {
//         return false;
//     };

//     return true;
// };

router.get('/search', async (req, res) => {

    let stone, name;
    const isLiker = await isStoneLiker(req, res);
    
    if (Object.keys(req.query).length === 0) {
        stone = await stoneService.getAll().lean();
    }
    else {
        const name = req.query;
        stone = (await stoneService.search(name));
    }

    res.render('furniture/search', { stone, name, isLiker });
});

function excludeCategory(categoryName, category) {
    return category.filter(furniture => furniture.category != categoryName);
}

module.exports = router;