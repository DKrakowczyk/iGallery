const User = require("../models/User");
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });

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


exports.profile = (req, res) => {
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

exports.updateProfile = (req, res) => {
    User.updateOne({},{$set: req.body}, (err) => {
        if(err) {res.send(err)}
        else {res.redirect('/dashboard/profile')}
    });
}

exports.upload = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            if (req.isAuthenticated()) {
                res.render('dashboard/upload', {username : users[0].username, imagePath: users[0].imagePath, description: users[0].description});
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect("/home");
        }
    });
}

exports.save = upload.single('filename');

exports.uploadPhoto =  (req, res) => {
res.redirect('/');
}