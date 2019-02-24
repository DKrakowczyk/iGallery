const express = require("express");
const router = express.Router();
const PagesController = require('../controllers/PagesController');
const passport = require("../auth/passport");

router.get('/', PagesController.homePage);
router.get('/login', PagesController.loginPage);
router.post('/login', PagesController.loginUser);
router.get('/register', PagesController.registerPage);
router.post('/register', PagesController.registerUser);
router.get('/dashboard', PagesController.dashboardPage);

router.get('/auth/instagram', PagesController.authInstagram);
router.get('/auth/instagram/dashboard', 
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


module.exports = router;