const User = require("../models/User");
const fs = require('fs');

// Render dashboard
exports.dashboardPage = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            if (req.isAuthenticated()) {
                res.render('dashboard/dashboard', { username: users[0].username });
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect("/home");
        }
    });
}

// Render profile page
exports.profile = (req, res) => {
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
    User.updateOne({}, { $set: req.body }, (err) => {
        if (err) { res.send(err) }
        else { res.redirect('/dashboard/profile') }
    });
}

// Render upload page
exports.upload = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            if (req.isAuthenticated()) {
                res.render('dashboard/upload', { status: "", username: users[0].username });
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect("/home");
        }
    });
}

// Add photo to gallery
exports.uploadPhoto = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            const uploadedFile = req.files.filename;
            uploadedFile.mv('./public/uploads/' + uploadedFile.name, function (err) {
                if (!err) {
                    res.render('dashboard/upload', { status: 1, username: users[0].username, recent: uploadedFile.name });
                }
                else {
                    res.render('dashboard/upload', { status: 2, username: users[0].username, recent: 0 });
                }
            });
        }
    });
}


// Render gallery page
exports.galleryPage = (req, res) => {
    const photoArray = [];

    User.find((err, users) => {
        if (!err) {
            fs.readdir('./public/uploads', (err, files) => {
                if (files !== undefined) {
                    files.forEach(file => {
                        photoArray.push(file);
                    });
                    if (users.length > 0) {
                        res.render("dashboard/gallery", { photoArray: photoArray, username: users[0].username });
                    }
                } else {
                    res.render("dashboard/gallery", { photoArray: photoArray, username: users[0].username });
                }
            });
        } else {
            res.redirect("/dashboard");
        }
    });
}

exports.removePhotoFromGallery = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            const name = req.body.name;
            fs.unlink('./public/uploads/' + name, function (err) {
                if (err) {
                    res.redirect('/dashboard/gallery');
                }
                res.redirect('/dashboard/gallery');
            });
        } else {
            res.redirect("/dashboard");
        }
    });





}