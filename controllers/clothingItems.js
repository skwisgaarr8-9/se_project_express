const ClothingItem = require('../models/clothingItem');
const { BadRequestError } = require('../utils/errors/BadRequestError');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { NotFoundError } = require('../utils/errors/NotFoundError');

module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
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
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteClothingItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(new NotFoundError('No item with that id'))
    .then((item) => {
      if (item.owner.toString() === req.user._id) {
        ClothingItem.findByIdAndRemove(item._id)
          .orFail()
          .then(() => {
            res.send({ data: item });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenError('Access denied');
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.likeClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail(new NotFoundError('No item with that id'))
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.dislikeClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError('No item with that id'))
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      next(err);
    });
};
