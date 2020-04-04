const AuthController = require('../controllers/auth');

const routes = (app, models) => {
  app.post('/sign-in', AuthController.signIn(models));
  app.post('/register', AuthController.register(models));
  app.all('/jwt', AuthController.jwt(models));
};

module.exports = routes;
