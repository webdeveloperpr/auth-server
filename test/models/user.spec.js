describe('userModel', () => {
  it('create a user with a password', async () => {
    const User = mongoose.model('user');
    const person1 = new User({
      firstName: 'Luis',
      lastName: 'Betancourt',
      email: 'webdeveloperpr@gmail.com',
      password: '12345678'
    });

    const user = await person1.save();
    expect(user.firstName).toBe('Luis');
    expect(user.lastName).toBe('Betancourt');
    expect(user.email).toBe('webdeveloperpr@gmail.com');
    expect(user.comparePassword('12345678')).toBe(true);
  });

  it('Fail creating a user with without email', async () => {
    const User = mongoose.model('user');
    const person1 = new User({
      firstName: 'Luis',
      lastName: 'Betancourt',
      password: '12345678'
    });

    try {
      await person1.save();
    } catch (err) {
      expect(err.message).toBe('user validation failed: email: can\'t be blank');
    }
  });

  it('Fail creating a password with less than 8 chars.', async () => {
    const User = mongoose.model('user');
    const person1 = new User({
      firstName: 'Luis',
      email: 'webdeveloperpr@gmail.com',
      lastName: 'Betancourt',
      password: '1234567'
    });

    try {
      await person1.save();
    } catch (err) {
      expect(err.message).toBe('user validation failed: password: has less than 8 characters');
    }
  });
});
