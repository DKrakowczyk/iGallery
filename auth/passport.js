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

    User.find((err, users) => {
      let newUser = undefined;
      if(users.length < 1) {
         newUser = new User({
          instagramId: profile.id,
          username: profile.username,
          imagePath: profile._json.data.profile_picture,
          description: profile._json.data.bio,
          accountType : "instagram"
        }).save();
      } else {
        return done(err, users[0]);
      }
    });
  }
));




module.exports = passport;