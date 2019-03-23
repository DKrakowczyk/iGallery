const User = require("../models/User");
const Task = require('../models/Task');
const fs = require('fs');

// Render dashboard
exports.dashboardPage = (req, res) => {
    const photoArray = [];

    User.find((err, users) => {
        if (!err) {
            if (req.isAuthenticated()) {
                fs.readdir('./public/uploads', (err, files) => {
                    if (files !== undefined) {
                        files.forEach(file => {
                            photoArray.push(file);
                        });
                        Task.find((err, tasks) => {
                            res.render('dashboard/dashboard', { username: users[0].username, photoArray:photoArray.slice(0,3), tasks:tasks});
                        })
                    }
                });
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect("/home");
        }
    });
}





