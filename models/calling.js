// This model will manage the calling elements of a meeting

const db = require('../services/db')

// create calling class
module.exports = class Calling {
    constructor(personId, orgId, calling, startDate, releaseDate = 'null') {
        this.personId = personId;
        this.orgId = orgId;
        this.calling = calling;
        this.startDate = startDate;
        this.releaseDate = releaseDate;
    }

    // save method
    save() {
        console.log("saving calling")
        const query = {
            text: 'INSERT INTO church.callings(person_id, org_id, calling, start_date, release_date) VALUES($1, $2, $3, $4, $5)',
            values: [this.personId, this.orgId, this.calling, this.startDate, this.releaseDate]
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

    // update method


    // fetchAll



    // findById





    // deleteById


}