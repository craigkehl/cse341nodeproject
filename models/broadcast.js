// This model will manage the broadcast elements of a meeting
const db = require('../services/db')
// create broadcast class
module.exports = class Broadcast {
    constructor(meetingId, moderatorId, meetingLink, providerId) {
        this.meetingId = meetingId,
        this.moderatorId = moderatorId,
        this.meetingLink = meetingLink,
        this.providerId = providerId
    }

    // save method
    save() {
        console.log("saving broadcast")
        const query = {
            text: 'INSERT INTO church.broadcasts(meeting_id, moderator_id, meeting_link, provider_id) VALUES($1, $2, $3, $4)',
            values: [this.meetingId, this.moderatorId, this.meetingLink, this.providerId]
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

    // fetchAll
    static fetchAll () {
        return new Promise((resolve, reject) => {
            db.query(`SELECT b.id, m.name AS meeting, b.meeting_id, m.start_date_time,
            b.meeting_link, CONCAT(p.lname,', ',p.fname) AS moderator, b.moderator_id
            FROM church.broadcasts b
            JOIN church.persons p ON b.moderator_id = p.id
            JOIN church.meetings m ON b.meeting_id = m.id 
            ORDER BY m.start_date_time;`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        })  
      }
     
  
      // findById
      static fetchById (id) {
          return new Promise((resolve, reject) => {
              db.query(`SELECT b.id, m.name AS meeting, b.meeting_id, m.start_date_time,
              b.meeting_link, CONCAT(p.lname,', ',p.fname) AS moderator, b.moderator_id
              FROM church.broadcasts b
              JOIN church.persons p ON b.moderator_id = p.id
              JOIN church.meetings m ON b.meeting_id = m.id 
              WHERE b.id = ${id};`, (err, res) => {
                  if (err) {
                      return reject(err)
                  }
                  resolve(res)
              })
          })
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
        })
    }

}
