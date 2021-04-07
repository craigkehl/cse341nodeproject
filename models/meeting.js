// This model will manage the schedule, assignments elements of a meeting
const db = require('../services/db')

// create meeting class
module.exports = class Meeting {
    constructor(meetingName, date, duration, is_public, orgId) {
        this.meetingName = meetingName,
        this.date = date,
        this.duration = duration,
        this.is_public = is_public,
        this.orgId = orgId
    }
    // save method
    async save() {
        console.log("saving meeting");
        const query = {
          text: 'INSERT INTO church.meetings(name, start_date_time, duration, "is_public") VALUES($1, $2, $3, $4) RETURNING id',
          values: [this.meetingName, this.date, this.duration, this.is_public]
        };
        const client = await db.connect();

        try {
          await client.query('BEGIN');
          const res = await client.query(query);
          const query2 = {
            text: 'INSERT INTO church.meetings_organizations(meeting_id, organization_id) VALUES($1, $2) RETURNING *',
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


    // fetchAll all meetings
    static fetchAll () {
      const query = `SELECT
        am.meeting, am.meeting_id, am.start_date_time AS date, 
        am.id AS broadcast_id, am.meeting_link,
        CONCAT(p.lname,', ',p.fname) AS moderator, am.moderator_id
        FROM
        (
          SELECT 
            b.id, m.name AS meeting, m.id AS meeting_id, m.start_date_time,
              b.meeting_link, b.moderator_id
          FROM church.meetings m
            LEFT JOIN church.broadcasts b ON m.id = b.meeting_id	
        ) AS am
        LEFT JOIN church.persons p ON p.id = am.moderator_id
        ORDER BY date;`;
      return new Promise((resolve, reject) => {
          db.query( query, (err, res) => {
              if (err) {
                  return reject(err);
              }
              return resolve(res);
          });
      })  
    }


    // fetchAll Current Meetings
    static fetchAllCurrent () {
      const query = `SELECT
        am.meeting, am.meeting_id, am.start_date_time AS date, 
        am.id AS broadcast_id, am.meeting_link,
        CONCAT(p.lname,', ',p.fname) AS moderator, am.moderator_id
        FROM
        (
          SELECT 
            b.id, m.name AS meeting, m.id AS meeting_id, m.start_date_time,
              b.meeting_link, b.moderator_id
          FROM church.meetings m
            LEFT JOIN church.broadcasts b ON m.id = b.meeting_id	
        ) AS am
        LEFT JOIN church.persons p ON p.id = am.moderator_id
        WHERE am.start_date_time > now()
        ORDER BY date;`;
      return new Promise((resolve, reject) => {
          db.query( query, (err, res) => {
              if (err) {
                  return reject(err);
              }
              return resolve(res);
          });
      })  
    }
   
    // fetchAll Current Public Meetings
    static fetchAllPublicCurrent () {
      const query = `SELECT
      am.meeting, am.meeting_id, am.start_date_time AS date, 
      am.id AS broadcast_id, am.meeting_link,
      CONCAT(p.lname,', ',p.fname) AS moderator, am.moderator_id,
      am.is_public
    FROM
    (
      SELECT 
      b.id, m.name AS meeting, m.id AS meeting_id, m.start_date_time,
      b.meeting_link, b.moderator_id, m.is_public
      FROM church.meetings m
      LEFT JOIN church.broadcasts b ON m.id = b.meeting_id
      WHERE m.is_public = 't'
    ) AS am
    LEFT JOIN church.persons p ON p.id = am.moderator_id
    WHERE am.start_date_time > now()
    ORDER BY date;`;
      return new Promise((resolve, reject) => {
          db.query( query, (err, res) => {
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