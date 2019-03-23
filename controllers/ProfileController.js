const User = require("../models/User");

// Render profile page
exports.renderProfilePage = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            if (req.isAuthenticated()) {
                res.render('dashboard/profile', { username: users[0].username, imagePath: users[0].imagePath, description: users[0].description });
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect("/home");
        }
    });
}

// Update profile data
exports.updateProfile = (req, res) => {
    if (req.isAuthenticated()) {
        User.updateOne({}, { $set: req.body }, (err) => {
            if (err) { res.send(err) }
            else { res.redirect('/dashboard/profile') }
        });
    }
}





