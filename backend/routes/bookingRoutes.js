const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBookingByUUID,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');
const { requireAuth, requireRole } = require('../middleware/auth');

// USER ROUTES
router.post('/', requireAuth, createBooking);
router.get('/my', requireAuth, getUserBookings);
router.get('/:bookingId', requireAuth, getBookingByUUID);
router.delete('/:bookingId', requireAuth, deleteBooking);

// ADMIN ROUTES
router.get('/', requireAuth, requireRole('admin'), getAllBookings);
router.put('/:bookingId/status', requireAuth, requireRole('admin'), updateBookingStatus);

module.exports = router;
