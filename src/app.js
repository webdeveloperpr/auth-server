const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/auth');
const passport = require('passport');
const strategies = require('./passport');

// Create the app.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

strategies(app, passport);
routes(app, passport);

module.exports = app;
