const ClothingItem = require("../models/clothingItem");

module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .orFail()
    .then((items) => {
      res.send({ data: items });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndRemove(req.params.itemId)
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      next(err);
    });
};
