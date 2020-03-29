describe('/login', () => {
  it('LocalStrategy', async () => {
    const User = mongoose.model('user');
    const data = {
      email: 'webdeveloperpr@gmail.com',
      password: '12345678',
      firstName: 'Luis',
      lastName: 'Betancourt',
    };

    await new User(data).save();

    request(app)
      .post('/login')
      .send({
        email: data.email,
        password: data.password,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.email).toBe(data.email);
      })
      .catch(err => expect(true).toBe(false));
  });

  // xit('JWTStrategy', async () => {
  //   const User = mongoose.model('user');
  //   const data = {
  //     email: 'webdeveloperpr@gmail.com',
  //     password: '12345678',
  //     firstName: 'Luis',
  //     lastName: 'Betancourt',
  //   };

  //   await new User(data).save();

  //   try {
  //     await request(app)
  //       .post('/login')
  //       .send({
  //         email: data.email,
  //         password: data.password,
  //       })
  //       .expect(200)
  //       .then(({ body }) => {
  //         expect(body.email).toBe(data.email);
  //       })
  //   } catch (err) {
  //     throw Error(err);
  //   }

  // });
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