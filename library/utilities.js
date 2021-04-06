const db = require('../services/db')

const  fetchAcctByEmail = (email, table) => {
    const query = { 
      text: `SELECT email FROM church.'${table}' WHERE email = '${email}';`
    }
    db.query(query)
    .then(result => {
      if (result.rowCount == 1) {
        return result.rows[0];
      }
      return null;
    })
}

module.exports = fetchAcctByEmail;
