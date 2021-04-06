// This model will manage the providers
const db = require('../services/db');

// create provider class
module.exports = class Provider {
    constructor(name, website, username = null, api_key = null) {
        this.name = name;
        this.website = website;
        this.username = username;
        this.api_key = api_key;
    }

    save() {
        console.log("saving provider")
        const query = {
            text: 'INSERT INTO church.providers(provider) VALUES($1, $2, $3, $4) RETURNING *;',
            values: [this.name, this.website, this.username, this.api_key]
          }
        // promise
        db.query(query)
        .then(result => {
            if (result.rowCount == 1) {
                return resolve(result.rows[0]);
            }

        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
    }

    static fetchAllProvidersList() {
        const query = `SELECT id AS provider_id, name AS provider FROM church.providers;` 
        
        db.query(query)
        .then(result => {
            if (result.rowCount > 0) {
                return resolve(result.rows);
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }

    static fetchProviderById(id) {
       const query = `SELECT * FROM church.providers WHERE church.persons.id == ${id};`
        db.query(query)
        .then(result => {
            if (result.rowCount = 1) {
                return resolve(result.row[0]);
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }

    // deleteById
    static deleteById(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM church.broadcasts
            WHERE id = ${id};`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                console.log(res);
                return resolve(res);
            })
        });
    }
}



// deleteById