const User = require("../models/User");


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

exports.updateProfile = (req, res) => {
    User.updateOne({}, { $set: req.body }, (err) => {
        if (err) { res.send(err) }
        else { res.redirect('/dashboard/profile') }
    });
}

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

exports.uploadPhoto = (req, res) => {

    User.find((err, users) => {
        if (!err) {
            const uploadedFile = req.files.filename;
            uploadedFile.mv('./public/uploads/' + uploadedFile.name, function (err) {
                if (!err) { 
                    res.render('dashboard/upload', { status: 1, username: users[0].username }); 
                }
                else {
                    res.render('dashboard/upload', { status: 2, username: users[0].username });
                }});
        }
    });
}

