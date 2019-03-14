const express = require("express");
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');

router.get('/', DashboardController.dashboardPage);

// Profile page
router.get('/profile', DashboardController.profile);
router.post('/profile/update', DashboardController.updateProfile);
router.get('/upload', DashboardController.upload);
router.post('/upload/single', DashboardController.save, DashboardController.uploadPhoto);

module.exports = router;