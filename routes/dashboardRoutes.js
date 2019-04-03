const express = require("express");
const router = express.Router();
const DashboardController = require('../controllers/DashboardController');
const TaskController = require('../controllers/TaskController');
const GalleryController = require('../controllers/GalleryController');
const ProfileController = require('../controllers/ProfileController');
const UploadController = require('../controllers/UploadController');

// Dashboard controller actions
router.get('/', DashboardController.default.dashboardPage);

// Profile controller actions
router.get('/profile', ProfileController.default.renderProfilePage);
router.post('/profile/update', ProfileController.default.updateProfile);

// Upload controller actions
router.get('/upload', UploadController.default.renderUploadPage);
router.post('/upload', UploadController.default.uploadPhoto);

// Gallery controller actions
router.get('/gallery', GalleryController.default.renderGalleryPage);
router.post('/gallery', GalleryController.default.removePhotoFromGallery);

// Tasks controller actions
router.get('/tasks', TaskController.default.renderTasksPage);
router.post('/tasks', TaskController.default.addTask);
router.post('/tasks/remove', TaskController.default.removeTask);

export default router;