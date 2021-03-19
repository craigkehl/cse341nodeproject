const Person = require('../models/person');


exports.postAddPerson = (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const gender = req.body.gender;
  const birthday = req.body.birthday;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const password = req.body.password;
  const access = req.body.access;
  const person = new Person(fname, lname, gender, birthday, mobile, email, password, access);
  person
    .save()
    .then(() => {
      res.status(201).json('Your person has been added.');
    })
    .catch(err => console.log(err));
};

