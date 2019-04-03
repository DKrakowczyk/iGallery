import User from '../models/User';
import fs from 'fs';


export default {
    // Render upload page
    async renderUploadPage(req, res) {
        await User.find((err, users) => {
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
    },

    // Add photo to gallery
    async uploadPhoto(req, res) {
        if (req.isAuthenticated()) {
            await User.find((err, users) => {
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

}





