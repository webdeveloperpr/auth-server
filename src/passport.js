const LocalStrategy = require('passport-local');

module.exports = (app, passport) => {
  // Local Strategy
  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.comparePassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
}