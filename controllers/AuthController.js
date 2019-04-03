import User from '../models/User';
import passport from '../auth/passport';

/* User
fields: {
    username,
    imagePath,
    description
}
*/
export default {
    async registerUser(req, res) {
        const username = req.body.username;
        const Password = req.body.password;

        await User.register({ username: username, imagePath: "sciezka", description: "opis" }, Password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/dashboard");
                });
            }
        });
    },

    async loginUser(req, res) {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        await req.login(user, (err) => {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/dashboard");
                });
            }
        });
    },

    authInstagram() {
        passport.authenticate('instagram');
    },

    authInstagramFailure() {
        passport.authenticate('instagram', { failureRedirect: '/login' });
    },

    authInstagramCallback(req, res) {
        res.redirect('/dashboard');
    },

    async logout(req, res) {
        await req.logout();
        res.redirect("/login");
    }


}
