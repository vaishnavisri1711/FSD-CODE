const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const tourController = require('../controllers/tourController');

router
.route('/tour-stats')
  .get(tourController.getTourStats);

router
.route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan);

router
.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;