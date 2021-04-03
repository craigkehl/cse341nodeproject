// This model will manage the schedule, assignments elements of a meeting
const db = require('../services/db')

// create meeting class
module.exports = class Meeting {
    constructor(meetingName, date, duration, isPublic, orgId) {
        this.meetingName = meetingName,
        this.date = date,
        this.duration = duration,
        this.isPublic = isPublic,
        this.orgId = orgId
    }
    // save method
    async save() {
        console.log("saving meeting");
        const query = {
          text: 'INSERT INTO church.meetings(name, start_date_time, duration, "isPublic") VALUES($1, $2, $3, $4) RETURNING id',
          values: [this.meetingName, this.date, this.duration, this.isPublic]
        };
        const client = await db.connect();

        try {
          await client.query('BEGIN');
          const res = await client.query(query);

          const query2 = {
            text: 'INSERT INTO church.meetings_organizations(meeting_id, organization_id) VALUES($1, $2)',
            values: [res.rows[0].id, this.orgId]
          };
          const res2 = await client.query(query2);
          await client.query('COMMIT');
          return res2;
        } catch (e) {
          await client.query('ROLLBACK');
          throw e
        } finally {
          client.release();
        }
    }


    // fetchAll
    static fetchAll () {
      return new Promise((resolve, reject) => {
          db.query(`SELECT
          am.meeting, am.meeting_id, am.start_date_time AS date, 
        am.id AS broadcast_id, am.meeting_link,
        CONCAT(p.lname,', ',p.fname) AS moderator, am.moderator_id
        FROM
        (
          SELECT 
            b.id, m.name AS meeting, b.meeting_id, m.start_date_time,
              b.meeting_link, b.moderator_id
          FROM church.meetings m
            LEFT JOIN church.broadcasts b ON m.id = b.meeting_id	
        ) AS am
        LEFT JOIN church.persons p ON p.id = am.moderator_id
        ORDER BY date;`, (err, res) => {
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