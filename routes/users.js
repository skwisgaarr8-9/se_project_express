const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getCurrentUser, updateUserProfile } = require('../controllers/users');
const { validateUserOrItemId } = require('../middlewares/validation');

router.get('/me', auth, validateUserOrItemId, getCurrentUser);
router.patch('/me', auth, validateUserOrItemId, updateUserProfile);
module.exports = router;
