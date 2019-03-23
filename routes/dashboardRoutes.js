const express = require("express");
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const TaskController = require('../controllers/TaskController');
const GalleryController = require('../controllers/GalleryController');
// Page rendering
router.get('/', DashboardController.dashboardPage);
router.get('/profile', DashboardController.profilePage);
router.get('/upload', DashboardController.uploadPage);



// Gallery controller actions
router.get('/gallery', GalleryController.renderGalleryPage);
router.post('/gallery', GalleryController.removePhotoFromGallery);

// Tasks controller actions
router.get('/tasks', TaskController.renderTasksPage);
router.post('/tasks', TaskController.addTask);
router.post('/tasks/remove', TaskController.removeTask);


// Action routes
router.post('/profile/update', DashboardController.updateProfile);
router.post('/upload', DashboardController.uploadPhoto);


module.exports = router;