const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const AuthController = require('../controllers/AuthController');

router.get('/', HomeController.homePage);
router.get('/login', HomeController.loginPage);
router.get('/register', HomeController.registerPage);
router.get('/logout', AuthController.logout);
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/auth/instagram', AuthController.authInstagram);
router.get('/auth/instagram/dashboard', AuthController.authInstagramFailure, AuthController.authInstagramCallback);

module.exports = router;