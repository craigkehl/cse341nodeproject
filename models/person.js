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

        this.name = function() {return this.firstName + " " + this.lastName;};       
      }
    // save method
    save() {
        const query = {
            text: 'INSERT INTO persons(fname, lname, gender, birthday, mobile, email, password, access) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
            values: [this.fname, this.lname, this.gender, this.birthday, this.mobile, this.email, this.password, this.access]
          }
          // promise
          db
            .query(query)
            .then(res => console.log(res.rows[0]))
            .catch(e => console.error(e.stack))
      }
    // save method
    static savePerson(fname, lname, gender, birthday, mobile, email, password, access) {
        const query = {
            text: 'INSERT INTO persons(fname, lname, gender, birthday, mobile, email, password, access) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
            values: [fname, lname, gender, birthday, mobile, email, password, access]
          }
          // promise
          db
            .query(query)
            .then(res => console.log(res.rows[0]))
            .catch(e => console.error(e.stack))
      }

    // fetchAll
    static getAllPersons () {
        return new Promise((resolve, reject) => {~
            db.query('SELECT * FROM persons', (err, res) => {
                if (err) {
                    return reject(err)
                }
                resolve(res)
            })
        })
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