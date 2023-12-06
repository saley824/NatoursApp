const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

//setting middleware
// router.param('id', tourController.checkID);

// router.use(tourController.checkIsValidBody);

router
  .route('/top5')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/stats').get(tourController.getTourStats);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getSingleTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
