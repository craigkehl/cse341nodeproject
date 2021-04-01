// This model will manage the organizations
const db = require('../services/db');

// create organization class
module.exports = class Organization {
    constructor(organization) {
        this.organization = organization;
    }

    save() {
        console.log("saving organzation")
        const query = {
            text: 'INSERT INTO church.organizations(organization) VALUES($1)',
            values: [this.organization]
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

    static fetchAllOrgs() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM church.organizations`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }

    static fetchOrgById(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM church.organizations WHERE church.persons.id == ${id}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
}



// fetchAll



// findById





// deleteById
