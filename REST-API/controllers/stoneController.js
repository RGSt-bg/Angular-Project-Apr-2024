const router = require('express').Router();

const stoneService = require('../services/stoneService');
const { isAuth } = require('../middlewares/authMiddleware');
const { isProductOwner } = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utils/errorUtil');
const Stone = require('../models/Category');
const { query } = require('express');

router.get('/dashboard', async (req, res) => {
    const stone = await stoneService.getAll().lean();
    res.render('stone/dashboard', { stone });
});

router.get('/create', isAuth, async (req, res) => {
    res.render('stone/create');
});

router.post('/create', isAuth, async (req, res) => {
    const newStone = req.body;
    try {
        await stoneService.create(req.user._id, newStone);

        res.redirect('/stone/dashboard');

    } catch (err) {
        console.log(err.message);
        res.render('stone/create', { ...newStone, error: getErrorMessage(err) });
    }
});

router.get('/details/:stoneId', async (req, res) => {
    const stoneId = req.params.stoneId;
    const isLiker = await isStoneLiker(req, res);

    let isLoggedIn = false;
    if (req.cookies['auth']) isLoggedIn = true;

    try {
        const stone = await stoneService.getOneDetailed(stoneId).lean();
        const isOwner = stone.owner?._id == req.user?._id;

        res.render('stone/details', { stone, isOwner, isLoggedIn, isLiker });
    }
    catch (err) {
        console.log(err.message);
        res.render('stone/dashboard', { error: getErrorMessage(err) });
    }
});

router.get('/like/:stoneId', async (req, res) => {

    const stoneId = req.params.stoneId;
    const isLiker = await isStoneLiker(req, res);

    let isLoggedIn = false;
    if (req.cookies['auth']) isLoggedIn = true;

    try {
        await stoneService.like(req.user._id, stoneId)
        const stone = await stoneService.getOneDetailed(stoneId).lean();
        const isOwner = stone.owner?._id == req.user?._id;

        res.render('stone/details', { stone, isOwner, isLoggedIn, isLiker });
    }
    catch (err) {
        console.log(err.message);
        res.render('/stone/dashboard', { error: getErrorMessage(err) });
    }
});

router.get('/edit/:stoneId', isAuth, isProductOwner, async (req, res) => {

    const stoneId = req.params.stoneId;
    let stone;

    let isLoggedIn = false;
    if (req.cookies['auth']) isLoggedIn = true;

    try {
        stone = await stoneService.getOne(stoneId).lean();
        res.render('stone/edit', { stone, isLoggedIn });
    }
    catch (err) {
        console.log(err.message);
        res.render('/stone/dashboard', { ...stone, error: getErrorMessage(err) });
    }
});

router.post('/edit/:stoneId', isAuth, async (req, res) => {
    const editedStone = req.body;

    try {
        await stoneService.edit(req.params.stoneId, editedStone);
        res.redirect(`/stone/details/${req.params.stoneId}`);
    }
    catch (err) {
        res.render(`/stone/edit/${req.params.stoneId}`, { ...editedStone, error: getErrorMessage(err) });
    }
});

router.get('/delete/:stoneId', isProductOwner, async (req, res) => {

    await stoneService.delete(req.params.stoneId);

    res.redirect('/stone/dashboard');
});

async function isStoneLiker(req, res) {
    const userId = req.user?._id;
    const stoneId = req.params.stoneId;
    const isLiker = await Stone.findOne({ likedList: userId, _id: stoneId });

    if (!isLiker) {
        return false;
    };

    return true;
};

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

    res.render('stone/search', { stone, name, isLiker });
});

module.exports = router;