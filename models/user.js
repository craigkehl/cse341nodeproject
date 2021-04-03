// This model will manage the users

const db = require('../services/db')

// create person class
module.exports = class User {
      constructor(email, password, id = null) {
        this.email = email;
        this.password = password;
        this.id = id;
      }
    // save method
    save() {
        console.log("saving user")
        const query = {
            text: 'INSERT INTO church.users(email, password) VALUES($1, $2) RETURN id',
            values: [this.email, this.password]
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

              return resolve(result.rowCount);
              }
            });
        });
    }

    static findEmail(value) {
        const query = { 
          text: `SELECT email FROM church.users WHERE email == ${value};`
        }
        db.query(query, (result) => {            
            console.log(result.rowCount);
            if (result.rowCount = 0) {
                return Promise.resolve(false);
            } else {
                return Promise.resolve(true);
            }
        })
        .catch(err => {
          console.error(err.stack)
          return Promise.reject(err.stack);
        });
    }


    // save method
    // static saveuser(fname, lname, gender, birthday, mobile, email, password, access) {
    //     const query = {
    //         text: 'INSERT INTO church.users(fname, lname, gender, birthday, mobile, email, password, access) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
    //         values: [fname, lname, gender, birthday, mobile, email, password, access]
    //       }
    //       // promise
    //       return new Promise ((resolve, reject) => {
    //         db
    //           .query(query, (err, result) => {
    //             if (err) {
    //               return reject(err)
    //             }
    //             console.log(result)
    //             return resolve(result.rowCount)
    //           })
    //       })
    //   }

    // fetchAll
    static fetchAllusers () {
        return db.query(`SELECT id, CONCAT(lname,', ',fname) AS name, birthday, gender, mobile, email FROM church.users`);
    }

    static fetchAllusersList () {
      return new Promise((resolve, reject) => {
          db.query(`SELECT id, CONCAT(lname,', ',fname) AS name FROM church.users ORDER BY lname`, (err, res) => {
              if (err) {
                  return reject(err);
              }
              return resolve(res);
          });
      })

    }
   

    // findById
    static getPersonById (id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM persons WHERE church.persons.id == ${id}`, (err, res) => {
                if (err) {
                    return reject(err)
                }
                resolve(res)
            })
        })
    }
    
    // deleteById
    static deleteById(id) {}

}



// const getPerson = (req, res, db) => {
//     db.select('*').from('persons')
//       .then(persons => {
//         if (persons.length) {
//           res.json(persons)
//         } else {
//           res.status(400).json('Not found')
//         }
//       })
//       .catch(err => res.status(400).json('error getting person'))
//   }  