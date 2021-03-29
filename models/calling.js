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
            text: 'INSERT INTO church.callings(personId, orgId, calling, startDate, releaseDate) VALUES($1, $2, $3, $4, $5)',
            values: [this.personId, this.orgId, this.calling, this.startDate, this.releaseDate]
          }
        // promise
        db
        .query(query)
        .then(result => {
            console.log(result.rowCount)
            return result.rowCount
        })
        .catch(err => {
            console.error(err.stack)
            return err.stack
        });
    }

    // update method


    // fetchAll



    // findById





    // deleteById


}