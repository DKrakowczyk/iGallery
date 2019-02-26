const passport = require("passport");
const InstagramStrategy = require("passport-instagram").Strategy;
const User = require("../models/User");

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


// instagram authentication
passport.use(new InstagramStrategy({
  clientID: "fd28c52b6af24315bbd8901d2a7e8314",
  clientSecret: "c4600b2404044131a0b9e75bf2157dca",
  callbackURL: "http://127.0.0.1:3000/auth/instagram/dashboard"
},
  function (accessToken, refreshToken, profile, done) {

    User.findOrCreate({ instagramId: profile.id, username: profile.username, imagePath: profile._json.data.profile_picture, description: profile._json.data.bio }, function (err, user) {
      return done(err, user);
    });
  }
));




module.exports = passport;