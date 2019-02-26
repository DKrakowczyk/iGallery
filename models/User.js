const mongoose = require("../database/database");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
username: String,
password: String,
imagePath: {
    type: String,
    default: "images/avatars/default.jpg"
},
description: {
    type: String, 
    default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis lacinia quam, sit amet pulvinar nisl volutpat id. Aenean non semper tellus, sed malesuada augue. Nullam posuere rutrum mi in scelerisque. Nulla ex nunc, feugiat eget diam at, fermentum sagittis dolor. Proin tempor augue vitae dui suscipit efficitur."
}
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
const User = mongoose.model("User", UserSchema);

module.exports = User;