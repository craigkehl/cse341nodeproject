// This model will manage the users
const db = require('../services/db')

// create person class
module.exports = class User {
  constructor(email, password, person_id) {
    this.email = email;
    this.password = password;
    this.person_id = person_id;
  }
      
  // save method
  save() {
    console.log("saving user")
    const query = {
      text: `INSERT INTO church.users(email, password, person_id) VALUES($1, $2, $3) RETURNING *`,
      values: [this.email, this.password, this.person_id]
    }
    // promise
    return new Promise ((resolve, reject) => {
      db
        .query(query, (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.rowCount = 1) {
          console.log(result.rowCount);
          return resolve(result.rows[0]); //returning user
          }
        });
    });
  }
    
  // fetchAll
  static fetchAllusers () {
      return db.query(`SELECT id, CONCAT(lname,', ',fname) AS name, birthday, gender, mobile, email FROM church.users`);
  }

  static fetchAllusersList() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, CONCAT(lname,', ',fname) AS name FROM church.users ORDER BY lname`, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
  }   

  // findById
  static getPersonById(id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM persons WHERE church.persons.id == ${id}`, (err, res) => {
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


