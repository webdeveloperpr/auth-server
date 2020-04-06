const mongoose = require('mongoose');
require('../src/models/user');

console.log('MONGO_DB_URL', process.env.MONGO_DB_URL);
console.log('JWT_SECRET_KEY', process.env.JWT_SECRET_KEY);
console.log('PORT', process.env.PORT);

// Connect to the docker database.
mongoose.connect(process.env.MONGO_DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



