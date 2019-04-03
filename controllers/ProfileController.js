import User from '../models/User';

export default {
    // Render profile page
    async renderProfilePage(req, res) {
        await User.find((err, users) => {
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
    },

    // Update profile data
    async updateProfile(req, res) {
        if (req.isAuthenticated()) {
            await User.updateOne({}, { $set: req.body }, (err) => {
                if (err) { res.send(err) }
                else { res.redirect('/dashboard/profile') }
            });
        }
    }
}








