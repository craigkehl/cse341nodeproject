const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

// postAddPerson => POST
router.post(
  '/add-person/',
  [
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
    body('birthday')
      .isString()
      .isLength({ min: 12, max: 30 })
      .trim(),
    body('mobile')
      .isString()
      .isLength({ min: 10, max: 15 })
      .trim(),
    body('password')
      .isString()
      .isLength({ min: 8, max: 50 })
      .trim(),
    body('access')
      .isString()
      .isLength({ min: 5, max: 8 })
      .trim()      
  ],
  adminController.postAddPerson
);


module.exports = router;
