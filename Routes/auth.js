const express = require('express');
const { body } = require('express-validator/check');

const User = require('../Models/userModel');
const authController = require('../Controllers/userController');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty(),
      body('Role').trim()
      .not().isEmpty()
  ],
  authController.signup
);

router.post('/login', authController.login);

router.get('/user', authController.user);

module.exports = router;
