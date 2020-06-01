const db = require("../../interfaces/postgres-interfaces/db-connect");
const logger = require("../../services/logger/logger");

module.exports = selectUsersByEmail;

async function selectUsersByEmail(email) {
  const query = `SELECT * FROM users WHERE email = $1`;

  const result = await db.query(query, [email]).catch((err) => {
    logger.error(err, "select-users-by-email.model.js", err.stack);
    return false;
  });

  return result;
}
