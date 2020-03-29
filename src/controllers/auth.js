// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');

// const jwt = ((jwt, secret) => ({
//   ...jwt,
//   sign: (payload, ...rest) => jwt.sign(payload, secret, ...rest),
//   verify: (token, ...rest) => jwt.verify(token, secret, ...rest),
// }))(require('jsonwebtoken'), process.env.JWT_SECRET_KEY);

// const createToken = (payload = {}) => new Promise((resolve, reject) => {
//   jwt.sign(payload, { expiresIn: '3 seconds' }, (err, token) => {
//     if (err) reject(err.message);
//     else {
//       resolve(token);
//     }
//   });
// })

// const verifyToken = token => new Promise((resolve, reject) => {
//   try {
//     jwt.verify(token, { complete: true }, (err, decoded) => {
//       if (err) reject(err.message);
//       else {
//         console.log('decoded', decoded);
//         resolve(decoded)
//       };
//     });
//   } catch (err) {
//     reject(err.message);
//   }
// });

// module.exports = app => {

// }


