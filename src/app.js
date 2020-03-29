const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const routes = require('./routes/auth');
const strategies = require('./passport');

// Create the app.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

((User) => {
  strategies(User, passport);
  routes(app, passport, { User });
})(mongoose.model('user'));


module.exports = app;
