const mongoose = require("../database/database");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
username: String,
password: String,
imagePath: String,
description: String
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
const User = mongoose.model("User", UserSchema);

module.exports = User;