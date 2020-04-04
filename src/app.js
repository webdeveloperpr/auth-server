const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/auth');

// Create the app.
const app = express();
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

((User) => {
  routes(app, { User });
})(mongoose.model('user'));


module.exports = app;
