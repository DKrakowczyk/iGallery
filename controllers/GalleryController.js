import User from '../models/User';
import fs from 'fs';



export default {
    async renderGalleryPage(req, res) {
        const photoArray = [];
        if (req.isAuthenticated()) {
            await User.find((err, users) => {
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
        } else {
            res.redirect("/");
        }
    },

    async removePhotoFromGallery(req, res) {
        if (req.isAuthenticated()) {
            await User.find((err, users) => {
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
        } else {
            res.redirect("/");
        }
    }
}




