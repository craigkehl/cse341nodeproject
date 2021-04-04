const { validationResult } = require('express-validator');

const db = require('../services/db');
const Person = require('../models/person');
const Organization = require('../models/organization');
const Calling = require('../models/calling');


exports.getIndex = (req, res, next) => {
  Person.fetchAllPersons()
  .then((result) => {
    res.status(200).json({ data: result.rows})
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

exports.getAddCalling = (req, res, next) => {
  const data = {};
  Organization.fetchAllOrgs()
    .then((orgs) => {
      data.organizations = orgs.rows;
    })
    .then(() => Person.fetchAllPersonsList())
    .then((peopleList) => {
      data.people = peopleList.rows;
    }) 
    .then(() => {
      res.status(200).json({ data: data })
    });
}

exports.postAddCalling = (req, res, next) => {
  const orgId = req.body.orgId;
  const personId = req.body.personId;
  const callingName = req.body.calling;
  const startDate = req.body.startDate;
  const releaseDate = req.body.releaseDate;

  const calling = new Calling(personId, orgId, callingName, startDate, releaseDate);

  calling.save()
    .then((result) => {
      if (+result == 1){
        res.status(201).json({ message: 'Your calling has been added.'});
      }
    }).catch(err => {
      console.log(err);
      res.status(401).json({ 
        message: 'Your calling was not added.',
        error: err
      });
    });
}

exports.getAllOrgs = (req, res, next) => {
  Organization.fetchAllOrgs()
    .then((orgs) => {
      console.log(orgs);
      res.status(200).json({data: orgs.rows});
    })
    .catch(err => {
      res.status(404).json({ message: "Could not retrieve organizations"})
    }
    )
}