const User = require("../models/User");
/* User
fields: {
    username,
    imagePath,
    description
}
*/

// Render login page
exports.homePage = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            if (users.length > 0) {
                res.render("home", { photo: users[0].imagePath, username: users[0].username, desc: users[0].description });
            } else {
                res.render("home", {
                    photo: "images/avatars/default.jpg", username: "Default user", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis lacinia quam, sit amet pulvinar nisl volutpat id. Aenean non semper tellus, sed malesuada augue. Nullam posuere rutrum mi in scelerisque. Nulla ex nunc, feugiat eget diam at, fermentum sagittis dolor. Proin tempor augue vitae dui suscipit efficitur."
                });
            }
        } else {
            res.redirect("/home");
        }
    });

}

// Render login page
exports.loginPage = (req, res) => {
    if (!req.isAuthenticated()) {
        User.find((err, users) => {
            if (!err) {
                if (users.length > 0) {
                    res.render("login", { isRegistered: 1 });
                } else {
                    res.render("login", { isRegistered: 0 });
                }
            } else {
                res.redirect("/home");
            }
        });
    } else {
        res.redirect('/dashboard');
    }
}

exports.registerPage = (req, res) => {
    res.render('register');
}

// Render dashboard
exports.dashboardPage = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            if (req.isAuthenticated()) {
                res.render('dashboard/dashboard', {username :users[0].username});
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect("/home");
        }
    });
   
}


exports.dashboardProfile = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            if (req.isAuthenticated()) {
                res.render('dashboard/profile', {username : users[0].username, imagePath: users[0].imagePath, description: users[0].description});
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect("/home");
        }
    });
}










