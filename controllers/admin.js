const { validationResult } = require('express-validator');

const db = require('../services/db');
const Person = require('../models/person');


exports.getIndex = (req, res, next) => {
  Person.getAllPersons()
  .then((result) => {
    res.status(200).json(result.rows)
  });


//   const sql = "SELECT id, fname, lname FROM church.persons";

//   db.query(sql, (err, res) => {
//     if (err) {
//         console.log(err);
//     }
//     // resolve(res)
//     console.log(res.rows);
// })
}

exports.postAddPerson = (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const gender = req.body.gender;
  const birthday = req.body.birthday;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const password = req.body.password;
  const access = req.body.access;
  console.log("In Admin Controller");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({
      message: 'Validation failed. Please enter the data correctly',
      errors: errors.array()
    });
  }
  // res.status(201).json("info received")
  // Person.savePerson(fname, lname, gender, birthday, mobile, email, password, access)
  // .then((err, result) => {
  //   if (err) {
  //     return res.status(401).json("Person was not saved")
  //   }
  //   const personId = getCurrPersonId()
  //   return result
  // })
  // .then((err, result) => {
  //   if (err) {
  //     return res.status(401).json('Person cound not be retrieved')
  //   }

  // })
  const person = new Person(fname, lname, gender, birthday, mobile, email, password, access);
  // console.log(person);
  person.save()
    .then((result) => {
      if (+result == 1){
        res.status(201).json('Your person has been added.');
      }
    }).catch(err => {
      console.log(err);
      res.status(401).json('Your person was not added.');
    });
};

