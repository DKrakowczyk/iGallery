const express = require("express");
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const TaskController = require('../controllers/TaskController');
const GalleryController = require('../controllers/GalleryController');
const ProfileController = require('../controllers/ProfileController');
const UploadController = require('../controllers/UploadController');

// Dashboard controller actions
router.get('/', DashboardController.dashboardPage);

// Profile controller actions
router.get('/profile', ProfileController.renderProfilePage);
router.post('/profile/update', ProfileController.updateProfile);

// Upload controller actions
router.get('/upload', UploadController.renderUploadPage);
router.post('/upload', UploadController.uploadPhoto);

// Gallery controller actions
router.get('/gallery', GalleryController.renderGalleryPage);
router.post('/gallery', GalleryController.removePhotoFromGallery);

// Tasks controller actions
router.get('/tasks', TaskController.renderTasksPage);
router.post('/tasks', TaskController.addTask);
router.post('/tasks/remove', TaskController.removeTask);

module.exports = router;