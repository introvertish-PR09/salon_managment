const Service = require('../models/service');

const createService = async (req, res) => {
  try {
    const { name, price, duration, description, image, isActive } = req.body;
    if (!name || !price || !duration) return res.status(400).json({ message: 'name, price, duration required' });
    const created = await Service.create({ name, price, duration, description, image, isActive });
    return res.status(201).json(created);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getServices = async (req, res) => {
  try {
    const { q, active, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (typeof active !== 'undefined') filter.isActive = active === 'true';
    if (q) filter.name = { $regex: q, $options: 'i' };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      Service.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Service.countDocuments(filter)
    ]);
    return res.json({ items, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getServiceById = async (req, res) => {
  try {
    const item = await Service.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json(item);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateService = async (req, res) => {
  try {
    const { name, price, duration, description, image, isActive } = req.body;
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { name, price, duration, description, image, isActive },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    return res.json(updated);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const toggleActive = async (req, res) => {
  try {
    const item = await Service.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    item.isActive = !item.isActive;
    await item.save();
    return res.json(item);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createService, getServices, getServiceById, updateService, deleteService, toggleActive };
