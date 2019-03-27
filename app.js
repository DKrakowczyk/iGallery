const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const express = require("express");
const ejs = require("ejs");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("./auth/passport");
const session = require("express-session"); //1
// Routes
const homeRoutes = require("./routes/homeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

// sessions
app.use(session({
    secret: "Little secret",
    resave: true,
    saveUninitialized: true
}));
// passport 
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is up!`);
});