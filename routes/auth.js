const express = require('express');
const { body, oneOf, param } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

// routes
router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        return User.findEmail(value).then(result => {
            if (result) {
                return Promise.reject('That email aready exists.');
            }
        })
    })
    .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 7 })
],
authController.signup);


module.exports = router;