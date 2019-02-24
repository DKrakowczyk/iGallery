const mongoose = require("../database/database");
const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
username: String,
password: String,
imagePath: String,
description: String
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;