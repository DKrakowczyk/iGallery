const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true }));


app.use('/', routes);

