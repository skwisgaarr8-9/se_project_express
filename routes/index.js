const router = require('express').Router();
const userRoutes = require('./users');
const itemRoutes = require('./clothingItems');
const { loginUser, createUser } = require('../controllers/users');
const {
  validateUserInfoBody,
  validateUserLoginInfoBody,
} = require('../middlewares/validation');
const { NotFoundError } = require('../utils/errors/NotFoundError');

router.use('/items', itemRoutes);
router.use('/users', userRoutes);
router.post('/signin', validateUserLoginInfoBody, loginUser);
router.post('/signup', validateUserInfoBody, createUser);
router.use(() => {
  throw new NotFoundError('Address does not exist');
});

module.exports = router;
