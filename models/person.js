// This model will manage the people/users

const db = require('../services/db')

// create person class
module.exports = class Person {
      constructor(fname, lname, gender, birthday, mobile = 'null', email = 'null', password = 'null', access = 'member') {
        this.fname = fname;
        this.lname = lname;
        this.gender = gender;
        this.birthday = birthday;
        this.mobile = mobile;
        this.email = email;
        this.password = password;
        this.access = access;

        // this.name = function() {return this.firstName + " " + this.lastName;};       
      }
    // save method
    save() {
        console.log("saving person")
        const query = {
            text: 'INSERT INTO church.persons(fname, lname, gender, birthday, mobile, email, password, access) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
            values: [this.fname, this.lname, this.gender, this.birthday, this.mobile, this.email, this.password, this.access]
          }
        // promise
        return new Promise ((resolve, reject) => {
          db
            .query(query, (err, result) => {
              if (err) {
                return reject(err);
              }
              console.log(result.rowCount);
              return resolve(result.rowCount);
            });
        });
    }

    getCurrentId() {
        const query = { 
          text: "SELECT currval(pg_get_serial_sequence('church.persons', 'id'))"
        }
        db.query(query, (result) => {            
            console.log(result)
            return resolve(result.rowCount)
        })
        .catch(err => {
          console.error(err.stack)
          return err.stack
        });
    }


    // save method
    // static savePerson(fname, lname, gender, birthday, mobile, email, password, access) {
    //     const query = {
    //         text: 'INSERT INTO church.persons(fname, lname, gender, birthday, mobile, email, password, access) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
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
    static getAllPersons () {
        return db.query('SELECT * FROM church.persons');
    }
   

    // findById
    static getPersonById (id) {
        return new Promise((resolve, reject) => {~
            db.query(`SELECT * FROM persons WHERE psersons.id == ${id}`, (err, res) => {
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