const routes = (app, passport, { User }) => {
  // invalidate the JWT token.
  app.post('/login', (req, res, next) => passport.authenticate('local', (err, user) => {
    err ? res.status(400).json(err) : res.status(200).json(user);
  })(req, res, next));

  app.post('/register', async (req, res) => {
    const user = await User(req.body).save();
    if (user) res.json(user);
    else res.status(400).json();
  });
};
module.exports = routes;
