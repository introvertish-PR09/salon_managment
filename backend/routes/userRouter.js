const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateProfile,
  getMyProfile
} = require('../controllers/userController');

const { requireAuth, requireRole } = require('../middleware/auth');
const upload = require('../middleware/uploads');

// ---------- USER ROUTES ----------
router.get('/me', requireAuth, getMyProfile);
router.put('/me', requireAuth, upload.single('avatar'), updateProfile);


// ---------- ADMIN ROUTES ----------
router.get('/', requireAuth, requireRole('admin'), getAllUsers);
router.get('/:id',  getUserById);
router.put('/:id', requireAuth, requireRole('admin'), updateUserById);
router.delete('/:id', requireAuth, requireRole('admin'), deleteUserById);

module.exports = router;
