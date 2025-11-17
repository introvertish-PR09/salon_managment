const router = require('express').Router();
const {registerUser,loginUser,getAllUsers,getUserById,updateUserById ,deleteUserById} = require('../controllers/authController');
const { requireAuth, requireRole } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;