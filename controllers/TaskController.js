import User from '../models/User';
import Task from '../models/Task';

export default {
    async renderTasksPage(req, res) {
        if (req.isAuthenticated()) {
            await User.find((err, user) => {
                if (!err) {
                    Task.find((err, tasks) => {
                        res.render('dashboard/tasks', { username: user[0].username, tasks: tasks });
                    });
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/');
        }
    },

    addTask(req, res) {
        if (req.isAuthenticated()) {
            const task = new Task({
                task: req.body.task,
                date: new Date().toISOString().slice(0, 10)
            }).save((err) => {
                if (!err) {
                    res.redirect('/dashboard/tasks');
                }
            });
        } else {
            res.redirect('/');
        }
    },

    async removeTask(req, res) {
        if (req.isAuthenticated()) {
            await Task.deleteOne({ _id: req.body.id }, (err) => {
                res.redirect('/dashboard/tasks');
            })
        } else {
            res.redirect('/');
        }
    }
}
