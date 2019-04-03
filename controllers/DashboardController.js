import User from '../models/User';
import Task from '../models/Task';
import fs from 'fs';

// Render dashboard
export default {
    async dashboardPage(req, res) {
        const photoArray = [];

        await User.find((err, users) => {
            if (!err) {
                if (req.isAuthenticated()) {
                    fs.readdir('./public/uploads', (err, files) => {
                        if (files !== undefined) {
                            files.forEach(file => {
                                photoArray.push(file);
                            });
                        }
                        Task.find((err, tasks) => {
                            res.render('dashboard/dashboard', { username: users[0].username, photoArray: photoArray.slice(0, 3), tasks: tasks });
                        })
                    });
                } else {
                    res.redirect('/login');
                }
            } else {
                res.redirect("/home");
            }
        });
    }
}





