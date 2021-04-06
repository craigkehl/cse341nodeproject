// This model will manage the people/users

const db = require('../services/db')

// create person class
module.exports = class Person {
  constructor(fname, lname, gender, birthday = 'null', mobile = 'null', email = 'null', access = 'member') {
    this.fname = fname;
    this.lname = lname;
    this.gender = gender;
    this.birthday = birthday;
    this.mobile = mobile;
    this.email = email;
    this.access = access;
  }
  // save method
  save() {
    console.log("saving person")
    const query = {
      text: 'INSERT INTO church.persons(fname, lname, gender, birthday, mobile, email, access) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
      values: [this.fname, this.lname, this.gender, this.birthday, this.mobile, this.email, this.access]
    }
      
    // maunal promise returning the person account
    return new Promise ((resolve, reject) => {
      db
        .query(query, (err, result) => {
          if (err) {
            return reject(err);
          };
          if (result.rowCount == 1) {
            return resolve(result.rows[0]); 
          }
        });
      });
    }

  // fetchAll
  static fetchAllPersons () {
    return db.query(`SELECT id, CONCAT(lname,', ',fname) AS name, birthday, gender, mobile, email FROM church.persons`);
  }

  static fetchAllPersonsList () {
    const query = `SELECT id, CONCAT(lname,', ',fname) AS name FROM church.persons ORDER BY lname`; 
    return new Promise((resolve, reject) => {
      db.query(query, (error, result) => {
        if (error) {
            return reject(error);
        }
        return resolve(result.rows);
      });
    });
  }

  // findById
  static getPersonById (id) {
    const query = `SELECT * FROM persons WHERE church.persons.id == ${id}`;
    return new Promise((resolve, reject) => {
      db.query( query, (err, res) => {
        if (err) {
            return reject(err)
        }
        resolve(res)
      });
    });
  }
    
  // deleteById
  static deleteById(id) {}

}