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
  console.log("In Admin Controller")
  Person.savePerson(fname, lname, gender, birthday, mobile, email, password, access);
  // const person = new Person(fname, lname, gender, birthday, mobile, email, password, access);
  // console.log(person);
  // person
  //   .save()
  //   .then(() => {
  //     res.status(201).json('Your person has been added.');
  //   })
  //   .catch(err => console.log(err));
};

