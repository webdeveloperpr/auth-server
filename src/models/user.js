const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

let user;

try {
  user = mongoose.model('user');
} catch (error) {
  const UserSchema = new Schema({
    firstName: {
      type: String,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, 'can\'t be blank'],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    lastName: {
      type: String,
      required: [true, 'can\'t be blank'],
    },
    password: {
      type: String,
      required: [true, 'can\'t be blank'],
      minlength: [8, 'has less than 8 characters'],
    },
  })

  UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    this.setPassword(this.password);
    next();
  });

  UserSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  user = mongoose.model('user', UserSchema);
}

module.exports = user;
