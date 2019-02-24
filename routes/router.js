const express = require("express");
const router = express.Router();
const PagesController = require('../controllers/PagesController');


router.get('/', PagesController.homePage);
router.get('/login', PagesController.loginPage);
router.post('/login', PagesController.loginUser);
router.get('/register', PagesController.registerPage);
router.post('/register', PagesController.registerUser);
router.get('/dashboard', PagesController.dashboardPage);


module.exports = router;