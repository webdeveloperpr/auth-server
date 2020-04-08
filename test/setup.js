
// connecting: Emitted when Mongoose starts making its initial connection to the MongoDB server
// connected: Emitted when Mongoose successfully makes its initial connection to the MongoDB server
// open: Equivalent to connected
// disconnecting: Your app called Connection#close() to disconnect from MongoDB
// disconnected: Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your code explicitly closing the connection, the database server crashing, or network connectivity issues.
// close: Emitted after Connection#close() successfully closes the connection. If you call conn.close(), you'll get both a 'disconnected' event and a 'close' event.
// reconnected: Emitted if Mongoose lost connectivity to MongoDB and successfully reconnected. Mongoose attempts to automatically reconnect when it loses connection to the database.
// error: Emitted if an error occurs on a connection, like a parseError due to malformed data or a payload larger than 16MB.
// fullsetup: Emitted when you're connecting to a replica set and Mongoose has successfully connected to the primary and at least one secondary.
// all: Emitted when you're connecting to a replica set and Mongoose has successfully connected to all servers specified in your connection string.
// reconnectFailed: Emitted when you're connected to a standalone server and Mongoose has run out of reconnectTries. The MongoDB driver will no longer attempt to reconnect after this event is emitted. This event will never be emitted if you're connected to a replica set.
require('@babel/register');
const mongoose = require('mongoose');
require('../src/database');
require('../src/models/user');

// global props
global.app = require('../src/app');
global.expect = require('expect');
global.request = require('supertest');
global.mongoose = mongoose;

before(done => {
  mongoose.connection
    .once('open', () => {
      console.log('mongodb connection opened.');
      done();
    })
    .on('disconnecting', () => {
      console.log('closing mongodb connection.');
    })
    .on('error', error => {
      console.warn('Warning', error);
      done();
    });
});

beforeEach(done => {
  const { users } = mongoose.connection.collections;
  users.drop()
    .then(() => done())
    .catch(() => done());
});

// Close the connection so that Mocha doesn't hang after thes tests run.
after(() => {
  mongoose.connection.close()
});
