const User = require("../models/User");
const passport = require("../auth/passport");
exports.homePage = (req, res) => {
    User.find((err, users) =>{
        if(!err){
            if(users.length > 0){
                res.render("home", {photo: users[0].imagePath, desc: users[0].description});
            } else {
                res.render("home", {photo: "users[0].imagePath", desc: "users[0].description"});
            }
        } else {
            res.redirect("/home");
        }
    });

}

exports.loginPage = (req, res) => {
    User.find((err, users) =>{
        if(!err){
            if(users.length > 0){
                res.render("login", {isRegistered: 1});
            } else {
                res.render("login", {isRegistered: 0});
            }
        } else {
            res.redirect("/home");
        }
    });
   
}

exports.registerPage = (req, res) => {
    res.render('register');
}
exports.dashboardPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard');
    } else {
        res.redirect('/login');
    }

}
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

exports.authInstagram = passport.authenticate('instagram');

exports.authCallback = ()=>{
    passport.authenticate('instagram', {failureRedirect: '/login'}),
    (req, res)=>{
        res.redirect('/dashboard');
    }
}