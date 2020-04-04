const jwt = ((jwt, secret) => ({
  ...jwt,
  sign: (payload, ...rest) => jwt.sign(payload, secret, ...rest),
  verify: (token, ...rest) => jwt.verify(token, secret, ...rest),
}))(require('jsonwebtoken'), process.env.JWT_SECRET_KEY);

const createToken = (payload = {}, options) => new Promise((resolve, reject) => {
  jwt.sign(payload, options, (err, token) => {
    if (err) reject(err.message);
    else {
      resolve(token);
    }
  });
})

const verifyToken = token => new Promise((resolve, reject) => {
  try {
    jwt.verify(token, { complete: true }, (err, decoded) => {
      if (err) reject(err.message);
      else {
        resolve(decoded)
      };
    });
  } catch (err) {
    reject(err.message);
  }
});

module.exports = {
  createToken,
  verifyToken,
}