const cookie = require('cookie');
const jwt = require('../../src/token');

describe('/sign-in', () => {
  it('should sign in a user', () => new Promise((resolve, reject) => {
    const User = mongoose.model('user');

    const data = {
      email: 'webdeveloperpr@gmail.com',
      password: '12345678',
      firstName: 'Luis',
      lastName: 'Betancourt',
    };

    // Create a new user.
    new User(data)
      .save()
      .then(() => {
        request(app)
          .post('/sign-in')
          .send({
            email: data.email,
            password: data.password,
          })
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user.email).toBe('webdeveloperpr@gmail.com');
            resolve();
          })
          .catch(err => reject(err))
      })
      .catch(err => reject(err));
  }));
  it('should fail to sign a user when email does not exist.', () => new Promise((resolve, reject) => {
    const User = mongoose.model('user');

    const data = {
      email: 'webdeveloperpr@gmail.com',
      password: '12345678',
      firstName: 'Luis',
      lastName: 'Betancourt',
    };

    // Create a new user.
    new User(data)
      .save()
      .then(() => {
        request(app)
          .post('/sign-in')
          .send({
            email: 'doesnotexist@gmail.com',
            password: data.password,
          })
          .expect(401)
          .then(({ body: { message, error } }) => {
            expect(message).toBe('error signing in.');
            expect(error.email).toBe('email does not exist');
            expect(error.password).toBe('');
            resolve();
          })
          .catch(err => reject(err))
      })
      .catch(err => reject(err));
  }));
  it('should when password does not match.', () => new Promise((resolve, reject) => {
    const User = mongoose.model('user');

    const data = {
      email: 'webdeveloperpr@gmail.com',
      password: '12345678',
      firstName: 'Luis',
      lastName: 'Betancourt',
    };

    // Create a new user.
    new User(data)
      .save()
      .then(() => {
        request(app)
          .post('/sign-in')
          .send({
            email: data.email,
            password: data.password + 1,
          })
          .expect(401)
          .then(({ body: { message, error } }) => {
            expect(message).toBe('password error');
            expect(error.email).toBe('');
            expect(error.password).toBe('invalid password');
            resolve();
          })
          .catch(err => reject(err))
      })
      .catch(err => reject(err));
  }));

  it('should set token as a cookie.', () => new Promise((resolve, reject) => {
    const User = mongoose.model('user');

    const data = {
      email: 'webdeveloperpr@gmail.com',
      password: '12345678',
      firstName: 'Luis',
      lastName: 'Betancourt',
    };

    // Create a new user.
    new User(data)
      .save()
      .then(() => {
        request(app)
          .post('/sign-in')
          .send({
            email: data.email,
            password: data.password,
          })
          .expect(200)
          .then(({ body: { message, error }, headers }) => {
            const userToken = cookie.parse(headers['set-cookie'][0]).token
            jwt.verifyToken(userToken)
              .then((token) => {
                expect(token.payload.email).toBe('webdeveloperpr@gmail.com');
                expect(message).toBe('user signed in!');
                expect(error.email).toBe('');
                expect(error.password).toBe('');
                resolve();
              }).catch(err => reject(err));
          })
          .catch(err => reject(err))
      })
      .catch(err => reject(err));
  }));
});

describe('/register', () => {
  it('should create a user', (done) => {
    const data = {
      email: 'webdeveloperpr@gmail.com',
      password: '12345678',
      firstName: 'Luis',
      lastName: 'Betancourt',
    };

    request(app)
      .post('/register')
      .send(data)
      .expect(200)
      .then(({ body }) => {
        expect(body.email).toBe(data.email);
        expect(body.name).toBe(data.name);
        expect(body.firstName).toBe(data.firstName);
        expect(body.lastName).toBe(data.lastName);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
});

describe('/jwt', () => {
  it('should return 200 when cookie is valid', () => new Promise((resolve, reject) => {
    const User = mongoose.model('user');

    const data = {
      email: 'webdeveloperpr@gmail.com',
      password: '12345678',
      firstName: 'Luis',
      lastName: 'Betancourt',
    };

    const agent = request.agent(app);

    // Create a new user.
    new User(data)
      .save()
      .then(() => {
        agent
          .post('/sign-in')
          .send({
            email: data.email,
            password: data.password,
          })
          .expect(200)
          .then(() => {
            agent
              .post('/jwt')
              .expect(200)
              .then(() => {
                resolve();
              })
          }).catch(err => reject(err))
      })
      .catch(err => reject(err));
  }));

  it('should return 401 when token is expired', () => new Promise((resolve, reject) => {
    const User = mongoose.model('user');

    const data = {
      email: 'webdeveloperpr@gmail.com',
      password: '12345678',
      firstName: 'Luis',
      lastName: 'Betancourt',
    };

    const agent = request.agent(app);

    // Create a new user.
    new User(data)
      .save()
      .then(() => {
        agent
          .post('/sign-in')
          .send({
            email: data.email,
            password: data.password,
            tokenOptions: {
              expiresIn: 0,
            }
          })
          .expect(200)
          .then(() => {
            agent
              .post('/jwt')
              .expect(403)
              .then(() => {
                resolve();
              })
          }).catch(err => reject(err))
      })
      .catch(err => reject(err));
  }));
});

