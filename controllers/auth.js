const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Person = require('../models/person');
const fetchAcctByEmail = require('../library/utilities');

exports.signup = (req, res, next) => {

    const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const fname = req.body.fname;
  const lname = req.body.lname;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hash(password, 12);
  existingEmail(email, 'persons')
  .then(person => {
    if (person.id > 0) {
      return person;
    }
    const birthday = null;
    const mobile = null;
    const access = 'member';
    return new Person(fname, lname, gender, birthday, mobile, email, access);
  })
  .then(person => {
    const user = User(email, hashedPassword, person.id);
    return user.save();
  })
  .then(user => {
    if (user.id > 0) {
      res.status(201).json({ 
        message: "User created"  // ****** time for token **************
      });
    }
    // possible place to add error if no user_id  
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
  
  fetchAcctByEmail(email, 'users')
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
    const accessToken = jwt.sign({ 
      email: currentUser.email, 
      userId: currentUser.id
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1hr' });
    res.status(200).json({ token: accessToken, userId: currentUser.id });
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