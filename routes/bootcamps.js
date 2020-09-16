const express = require('express');
const router = express.Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');
const Bootcamp = require('../models/Bootcamp');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
//include other resource routers
const courseRouter = require('./courses');
//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);
router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);
module.exports = router;
