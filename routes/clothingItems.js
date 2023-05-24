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
  validateUserOrItemId,
} = require('../middlewares/validation');

router.get('/', getClothingItems);
router.post('/', auth, validateClothingItemBody, createClothingItem);
router.delete('/:itemId', auth, validateUserOrItemId, deleteClothingItem);
router.put('/:itemId/likes', auth, validateUserOrItemId, likeClothingItem);
router.delete(
  '/:itemId/likes',
  auth,
  validateUserOrItemId,
  dislikeClothingItem
);

module.exports = router;
