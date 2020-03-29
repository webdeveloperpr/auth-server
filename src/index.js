const mongoose = require('mongoose');
const app = require('./app');
require('./database');

mongoose.connection
  .once('open', () => {
    (port => app.listen(port, () => console.log(`Listening on port ${port}`)))(process.env.PORT);
  })
  .on('error', error => {
    console.warn('Warning', error);
  });

