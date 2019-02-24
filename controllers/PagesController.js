const User = require("../models/User");
const passport = require("../auth/passport");
exports.homePage = (req, res) =>{
    res.render('home');
}

exports.loginPage = (req, res) => {
    res.render('login');
}

exports.registerPage = (req, res) => {
    res.render('register');
}
exports.dashboardPage = (req, res) => {
    if(req.isAuthenticated()){
        res.render('dashboard');
    } else {
        res.send("nie mozna zalogowac");
    }
    
}
exports.registerUser = (req, res) => {
    const username = req.body.username;
    const Password = req.body.password;

    User.register({username: username, imagePath: "sciezka", description:"opis"}, Password, (err, user) => {
        if(err){
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

    req.login(user, (err) =>{
        if(err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/dashboard");
            });
        }
    });
}
        

