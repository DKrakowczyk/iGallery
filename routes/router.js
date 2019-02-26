const express = require("express");
const router = express.Router();
const PagesController = require('../controllers/PagesController');
const AuthController = require('../controllers/AuthController');


// PagesController
router.get('/', PagesController.homePage);
router.get('/login', PagesController.loginPage);
router.get('/register', PagesController.registerPage);
router.get('/dashboard', PagesController.dashboardPage);
router.get('/dashboard/profile', PagesController.dashboardProfile);

// AuthController
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
// Instagram authorization
router.get('/auth/instagram', AuthController.authInstagram);
router.get('/auth/instagram/dashboard', AuthController.authInstagramFailure, AuthController.authInstagramCallback);


module.exports = router;