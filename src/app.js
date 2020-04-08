const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/auth');

// Create the app.
const app = express();
app.use(cors({
  origin: true,
  credentials: true,
  // methods: '',
  // allowedHeaders: '',
  // exposedHeaders: '',
  // maxAge: '',
  // preflightContinue: true,
  // optionsSuccessStatus: '',
}))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

console.log('MONGO_DB_URL', process.env['MONGO_DB_URL']);

((User) => {
  routes(app, { User });
})(mongoose.model('user'));


module.exports = app;
