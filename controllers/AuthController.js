const User = require("../models/User");
const passport = require("../auth/passport");
/* User
fields: {
    username,
    imagePath,
    description
}
*/

// Register user
exports.registerUser = (req, res) => {
    const username = req.body.username;
    const Password = req.body.password;

    User.register({ username: username, imagePath: "sciezka", description: "opis" }, Password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/dashboard");
            });
        }
    });
}

// Login user
exports.loginUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/dashboard");
            });
        }
    });
} 

// Instagram auth
exports.authInstagram = passport.authenticate('instagram');

exports.authInstagramFailure = passport.authenticate('instagram', { failureRedirect: '/login' });

exports.authInstagramCallback = (req, res) => {
    res.redirect('/dashboard');
}