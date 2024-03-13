const furnitureService = require('../services/furnitureService');

exports.isProductOwner = async (req, res, next) => {
    const furniture = await furnitureService.getOne(req.params.furnitureId);

    if (furniture.owner != req.user?._id) {
        return res.redirect('/furniture/furnitures');
    };

    next();
};