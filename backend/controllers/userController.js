const User = require('../models/user');
const multer = require('multer');
const path = require('path');

const getAllUsers = async (req, res) => {
  try {
    // Query values
    const {
      q = '',
      page = 1,
      limit = 10,
      sortBy = 'username',
      sortDir = 'asc'
    } = req.query;

    const query = {};

    // SEARCH
    if (q) {
      query.$or = [
        { username: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ];
    }

    // PAGINATION
    const skip = (page - 1) * limit;

    // SORTING
    const sort = {};
    sort[sortBy] = sortDir === 'asc' ? 1 : -1;

    // TOTAL BEFORE PAGINATION
    const total = await User.countDocuments(query);

    // FETCH USERS
    const users = await User.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .select('-password');  // hide password

    res.json({
      items: users,
      total
    });

  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);

  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};


const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json(updated);

  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.avatar = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.userId, data, { new: true })
                           .select('-password');

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: 'Profile update failed' });
  }
};



module.exports = { getAllUsers ,getUserById,updateUserById ,deleteUserById ,updateProfile, getMyProfile};
