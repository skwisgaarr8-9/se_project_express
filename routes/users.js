const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getCurrentUser, updateUserProfile } = require('../controllers/users');
const { validateUserProfileInfoBody } = require('../middlewares/validation');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, validateUserProfileInfoBody, updateUserProfile);
module.exports = router;
