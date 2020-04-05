const mongoose = require('mongoose');
require('../src/models/user');

const MONGO_DB_URL = [
  ((url, or) => url || or)(process.env.MONGO_DB_URL, 'mongodb://127.0.0.1'),
  ((port, or) => port ? `:${port}` : or)(process.env.MONGO_DB_PORT, ''),
  ((name, or) => name ? `/${name}` : or)(process.env.MONGO_DB_NAME, ''),
].join('');

// Connect to the docker database.
mongoose.connect(MONGO_DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



