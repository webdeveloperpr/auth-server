const token = require('../token');
const TOKEN_SECONDS = 0 * 1000;
const TOKEN_MINUTES = 0 * (60 * 1000);
const TOKEN_HOURS = 1 * (60 * 60 * 1000);
const TOKEN_EXPIRATION = TOKEN_SECONDS + TOKEN_MINUTES + TOKEN_HOURS;

const AuthController = {};

AuthController.signIn = ({ User }) => async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // user does not exist
    if (!user) {
      return res.status(401).json({
        message: 'error signing in.',
        error: {
          email: 'email does not exist',
          password: ''
        },
      });
    }

    const passwordMatches = user.comparePassword(password);
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    if (passwordMatches) {
      // Allow custom token options to be passed from tests, when 
      // not in production mode
      const options = process.env.NODE_ENV !== 'production'
        ? req.body.tokenOptions || { expiresIn: TOKEN_EXPIRATION }
        : { expiresIn: TOKEN_EXPIRATION };

      return token
        .createToken({
          id: user._id,
          email: user.email,
          refresh: 0,
        }, options)
        .then(userToken => {
          // user exists and password matches
          res
            .cookie('token', userToken, { maxAge: TOKEN_EXPIRATION })
            .status(200)
            .json({
              message: 'user signed in!',
              user: userWithoutPassword,
              error: {
                email: '',
                password: '',
              },
            });
        })
        .catch(err => {
          // There was an error creating the user token
          res
            .status(400)
            .json({
              message: `error generating user token ${err}`,
              error: {
                email: '',
                password: '',
              }
            })
        });
    }

    // user exists but password does not match
    return res.status(401).json({
      message: 'password error',
      error: {
        email: '',
        password: 'invalid password',
      },
    });

  } catch (err) {
    // unknown error (probably db)
    return res.status(401).json({
      message: `unknown error. ${err}`,
      error: {
        email: '',
        password: '',
      },
    });
  }
};

AuthController.register = ({ User }) => async (req, res) => {
  try {
    const user = await User(req.body).save();
    if (user) res.json(user);
    else res.status(400).json({ error: 'Error creating user' });
  } catch (err) {
    res.status(400).send({ error });
  }
};

AuthController.refreshToken = async (req, res, decodedToken, tokenOptions) => {
  const refresh = decodedToken.payload.refresh ? Number(decodedToken.payload.refresh) + 1 : 0
  const newToken = await token.createToken({
    id: decodedToken.payload.id,
    email: decodedToken.payload.email,
    refresh,
  }, tokenOptions)

  // Set the new token as the users `token` cookie
  res.cookie('token', newToken, { maxAge: TOKEN_EXPIRATION });
  return newToken;
}

AuthController.jwt = ({ User }) => async (req, res) => {
  const userToken = req.cookies.token;

  const options = process.env.NODE_ENV !== 'production'
    ? req.body.tokenOptions || { expiresIn: TOKEN_EXPIRATION }
    : { expiresIn: TOKEN_EXPIRATION };

  if (!userToken) return res.status(401).json();

  try {
    const decodedToken = await token.verifyToken(userToken);

    const user = {
      id: decodedToken.payload.id,
      email: decodedToken.payload.email,
    }

    await AuthController.refreshToken(req, res, decodedToken, options);

    return res.status(200).json({ user });

  } catch (err) {

    res.status(403).json();
  };
};

module.exports = AuthController;
