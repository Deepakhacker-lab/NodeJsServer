const bcrypt = require('bcryptjs');
const { request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (request, response, next) => {
  const email = request.body.email;
  const name = request.body.name;
  const password = request.body.password;
  const Role= request.body.Role;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
        Role: Role
      });
      return user.save();
    })
    .then(result => {
      response.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      res.status(201).json({ 
        token: token, 
        role : loadedUser.Role,
        userId: loadedUser._id.toString() 
        
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.user =(Request,Response, next)=>{
  Response.status(200);
};
