const UserController = require('../controllers/user');

const routes = (app, models) => {
  app.get('/user/:id', UserController.get(models));
  app.post('/user/:id', UserController.create(models));
  app.patch('/user/:id', UserController.update(models));
  app.delete('/user/:id', UserController.delete(models));
};

module.exports = routes;
