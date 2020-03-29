const routes = (app, passport) => {
  // invalidate the JWT token.
  app.get('/login', passport.authenticate('local', ((req, res) => {

  })));
};

module.exports = routes;
