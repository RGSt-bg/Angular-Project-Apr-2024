const stoneService = require('../services/stoneService');

exports.isProductOwner = async (req, res, next) => {
    const stone = await stoneService.getOne(req.params.stoneId);

    if (stone.owner != req.user?._id) {
        return res.redirect('/stone/dashboard');
    };

    next();
};