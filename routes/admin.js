const path = require('path');

const express = require('express');
const { body, oneOf } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

//router.get('/', adminController.getIndex);

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
      .isISO8601(),    
    oneOf([
      body('mobile')
      .isString()
      .isLength({ min: 10, max: 15 })
      .trim(),
      body('mobile').isEmpty()
    ]),
    oneOf([
      body('email')
      .isEmail(),
      body('email').isEmpty()
    ]), 
    body('access')
      .isString()
      .isLength({ min: 5, max: 8 })
      .trim()      
  ],
  adminController.postAddPerson
);

router.get('/add-calling/', adminController.getAddCalling);

router.post('/add-calling/', adminController.postAddCalling);

router.get('/orgs/', adminController.getAllOrgs);

module.exports = router;
