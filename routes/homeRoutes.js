const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const AuthController = require('../controllers/AuthController');

router.get('/', HomeController.default.homePage);
router.get('/login', HomeController.default.loginPage);
router.get('/register', HomeController.default.registerPage);
router.get('/logout', AuthController.default.logout);
router.post('/register', AuthController.default.registerUser);
router.post('/login', AuthController.default.loginUser);
router.get('/auth/instagram', AuthController.default.authInstagram);
router.get('/auth/instagram/dashboard', AuthController.default.authInstagramFailure, AuthController.default.authInstagramCallback);

export default router;