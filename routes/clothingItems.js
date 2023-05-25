const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require('../controllers/clothingItems');
const {
  validateClothingItemBody,
  validateId,
} = require('../middlewares/validation');

router.get('/', getClothingItems);
router.post('/', auth, validateClothingItemBody, createClothingItem);
router.delete('/:itemId', auth, validateId, deleteClothingItem);
router.put('/:itemId/likes', auth, validateId, likeClothingItem);
router.delete(
  '/:itemId/likes',
  auth,
  validateId,
  dislikeClothingItem
);

module.exports = router;
