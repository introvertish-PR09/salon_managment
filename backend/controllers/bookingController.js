const Booking = require('../models/booking');

const createBooking = async (req, res) => {
  try {
    const { serviceId, date, time, notes } = req.body;
    if (!serviceId || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBooking = await Booking.create({
      userId: req.user.userId,
      serviceId,
      date,
      time,
      notes
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating booking' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .populate('serviceId', 'name price duration')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

const getAllBookings = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      q = '',
      sortBy = 'createdAt',
      sortDir = 'desc'
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    if (q && q.trim() !== '') {
      filter.$or = [
        { 'serviceId.name': { $regex: q, $options: 'i' } },
        { 'userId.username': { $regex: q, $options: 'i' } },
        { 'userId.email': { $regex: q, $options: 'i' } }
      ];
    }

    const bookingsQuery = Booking.find(filter)
      .populate('userId', 'username email mobileNumber')
      .populate('serviceId', 'name price duration');

    // Sorting
    const sortObj = {};
    sortObj[sortBy] = sortDir === 'asc' ? 1 : -1;
    bookingsQuery.sort(sortObj);

    // Pagination
    bookingsQuery.skip((page - 1) * limit).limit(limit);

    const [items, total] = await Promise.all([
      bookingsQuery,
      Booking.countDocuments(filter)
    ]);

    res.json({
      items,
      total,
      page,
      limit
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};


const getBookingByUUID = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId })
      .populate('userId', 'username email')
      .populate('serviceId', 'name price duration');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch {
    res.status(500).json({ message: 'Error fetching booking' });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findOneAndUpdate(
      { bookingId: req.params.bookingId },
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch {
    res.status(500).json({ message: 'Failed to update booking status' });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ bookingId: req.params.bookingId });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete booking' });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBookingByUUID,
  updateBookingStatus,
  deleteBooking
};
