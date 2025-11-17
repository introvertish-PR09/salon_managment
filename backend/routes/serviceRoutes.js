
const router = require('express').Router();
const {getServices,getServiceById,createService,updateService,deleteService,toggleActive} = require('../controllers/serviceController');
const { requireAuth, requireRole } = require('../middleware/auth');


router.get('/', getServices);
router.get('/:id', getServiceById);

router.post('/', requireAuth, requireRole('admin'), createService);
router.put('/:id', requireAuth, requireRole('admin'), updateService);
router.delete('/:id', requireAuth, requireRole('admin'), deleteService);
router.patch('/:id/toggle', requireAuth, requireRole('admin'), toggleActive);

module.exports = router;