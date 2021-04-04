const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {

    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      const user = new User(email, hashedPassword);
  return user.save();
    })
    .then(result => {
      res.status(201).json({ 
        message: "User created",
      userId: result.rows[0].id
      });
    })
    .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });

}

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let currentUser;
  User.findEmail(email)
    .then(user => {
      if (!user) {
        const error = new Error('Account not found');
        error.statusCode = 404;
        throw error;
      }
      currentUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign({ 
        email: currentUser.email, 
        userId: currentUser.id
      }, 
      'SFwG2cTwWwby2030f202!CK',
      { expiresIn: '1hr' });
      res.status(200).json({ token: token, userId: currentUser.id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


// const db = require('../services/db');
// // const jwt = require('jsonwebtoken');
// // const crypto = require('crypto');

// exports.logEmployee = (req, res) => {
//     res.status(200).json({ token: 'Bearer ' + jwt.sign(req.employee, process.env.SECRET, { expiresIn: 1800 }) });//expires in 1800 seconds
//     res.end();
// };

// exports.hashPassword = (req, res, next) => {
//     crypto.scrypt(req.body.password.toString(), 'salt', 256, (err, derivedKey) => {
//         if (err) {
//             return res.status(500).json({ errors: [{ location: req.path, msg: 'Could not do login', param: req.params.id }] });
//         }
//         req.body.kdfResult = derivedKey.toString('hex');
//         next();
//     });
// };

// exports.lookupLogin = (req, res, next) => {
//     const sql = 'SELECT e.employee_id, e.login FROM employee e WHERE e.login=$1 AND e.password = $2';
//     postgres.query(sql, [req.body.login, req.body.kdfResult], (err, result) => {
//         if (err) {
//             return res.status(500).json({ errors: [{ location: req.path, msg: 'Could not do login', param: req.params.id }] });
//         }
//         if (result.rows.length === 0) {
//             return res.status(404).json({ errors: [{ location: req.path, msg: 'User or password does not match', param: req.params.id }] });
//         }
//         req.employee = result.rows[0];
//         next();
//     });
// };