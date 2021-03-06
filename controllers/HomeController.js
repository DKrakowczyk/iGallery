import User from '../models/User';
import fs from 'fs';

/* User
fields: {
    username,
    imagePath,
    description
}
*/
export default {
    // Render home page
    async homePage(req, res) {
        const photoArray = [];

        await User.find((err, users) => {
            if (!err) {
                fs.readdir('./public/uploads', (err, files) => {
                    if (files !== undefined) {
                        files.forEach(file => {
                            photoArray.push(file);
                        });
                    }
                    if (users.length > 0) {
                        res.render("home", { photoArray: photoArray, photo: users[0].imagePath, username: users[0].username, desc: users[0].description });
                    } else {
                        res.render("home", {
                            photoArray: [], photo: "images/avatars/default.jpg", username: "Default user", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis lacinia quam, sit amet pulvinar nisl volutpat id. Aenean non semper tellus, sed malesuada augue. Nullam posuere rutrum mi in scelerisque. Nulla ex nunc, feugiat eget diam at, fermentum sagittis dolor. Proin tempor augue vitae dui suscipit efficitur."
                        });
                    }
                });
            } else {
                res.render("home", {
                    photoArray: [], photo: "images/avatars/default.jpg", username: "Default user", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis lacinia quam, sit amet pulvinar nisl volutpat id. Aenean non semper tellus, sed malesuada augue. Nullam posuere rutrum mi in scelerisque. Nulla ex nunc, feugiat eget diam at, fermentum sagittis dolor. Proin tempor augue vitae dui suscipit efficitur."
                });
            }
        });
    },

    async loginPage(req, res) {
        if (!req.isAuthenticated()) {
            await User.find((err, users) => {
                if (!err) {
                    if (users.length > 0) {
                        console.log("Znalazlem uzytkownika - login");
                        res.render("login", { isRegistered: 1, accountType: users[0].accountType });
                    } else {
                        console.log("Nie znalazlem uzytkownika - login");
                        res.render("login", { isRegistered: 0 });
                    }
                } else {
                    console.log("Error w szukaniu usera");
                    res.redirect("/home");
                }
            });
        } else {
            res.redirect('/dashboard');
        }
    },

    registerPage(req, res) {
        res.render('register');
    }

}
