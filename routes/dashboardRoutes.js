const express = require("express");
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');

// Page rendering
router.get('/', DashboardController.dashboardPage);
router.get('/profile', DashboardController.profilePage);
router.get('/upload', DashboardController.uploadPage);
router.get('/gallery', DashboardController.galleryPage);
router.get('/tasks', DashboardController.tasksPage);

// Action routes
router.post('/profile/update', DashboardController.updateProfile);
router.post('/upload', DashboardController.uploadPhoto);
router.post('/gallery', DashboardController.removePhotoFromGallery);


module.exports = router;