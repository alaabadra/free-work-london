const dbconnection = require('../../config/db_connection');
const addMmeber = ({ username, password, email }) => {
  console.log('bbbbb',username);
  const sql = {
    text: 'INSERT INTO member(username, pass, email) VALUES ( $1, $2, $3 ) RETURNING *',
    values: [username, password, email],
  };
  return dbconnection.query(sql);
};
module.exports = addMmeber;