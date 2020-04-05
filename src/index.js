const mongoose = require('mongoose');
require('./database');
const app = require('./app');

mongoose.connection
  .once('open', () => {
    (port => app.listen(port, () => console.log(`Listening on port ${port}`)))(process.env.PORT);
  })
  .on('error', error => {
    console.warn('Warning', error);
  });

