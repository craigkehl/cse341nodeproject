const express = require('express');
const { body, oneOf, param, check } = require('express-validator');

const authController = require('../controllers/auth');
const fetchAcctByEmail = require('../library/utilities');

const router = express.Router();

// routes
router.put('/signup', [
  body('fname')
  .isString()
  .isLength({ min: 3 })
  .trim(),
  body('lname')
  .isString()
  .isLength({ min: 3 })
  .trim(),
  body('gender')
  .isString()
  .isLength({ min: 4, max: 6 })
  .trim(),
  body('email')
  .isEmail()
  .withMessage('Please enter a valid email.')
  .custom(value => {
    const table = 'users';
    return fetchAcctByEmail(value, table)
      .then(user => {
        if (user) {
          return Promise.reject('That email aready exists.');
        }
    });
  })
  .normalizeEmail(),
  body('password')
  .trim()
  .isLength({ min: 7 })
],
authController.signup);

router.post('/login', authController.login);

module.exports = router;