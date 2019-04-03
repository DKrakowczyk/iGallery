import 'babel-polyfill';
import {} from 'dotenv/config';
import express from 'express';
import ejs from 'ejs';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import path from 'path';
import passport from './auth/passport';
import session from 'express-session';
// Routes
import homeRoutes from './routes/homeRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

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