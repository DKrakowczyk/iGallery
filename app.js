const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/router")
const passport = require("./auth/passport");
const session = require("express-session"); //1
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

// sessions
app.use(session({
    secret: "Little secret",
    resave: false,
    saveUninitialized: false
}));
// passport 
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(3000, () => {
    console.log("Server is running");
});