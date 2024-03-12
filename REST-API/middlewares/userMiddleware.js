const furnitureService = require('../services/furnitureService');

exports.isProductOwner = async (req, res, next) => {
    const stone = await furnitureService.getOne(req.params.stoneId);

    if (stone.owner != req.user?._id) {
        return res.redirect('/furniture/furnitures');
    };

    next();
};