const User = require("../models/User");
const fs = require('fs');

// Render upload page
exports.renderUploadPage = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            if (req.isAuthenticated()) {
                res.render('dashboard/upload', { status: "", username: users[0].username });
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect("/");
        }
    });
}

// Add photo to gallery
exports.uploadPhoto = (req, res) => {
    if (req.isAuthenticated()) {
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
}





