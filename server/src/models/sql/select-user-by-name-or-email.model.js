const db = require("../../interfaces/postgres-interfaces/db-connect");
const logger = require("../../services/logger/logger");

module.exports = selectUserByNameOrEmail;

async function selectUserByNameOrEmail(email, userName) {
  const query = `SELECT * FROM users WHERE email = $1 OR user_name = $2`;

  const result = await db.query(query, [email, userName]).catch((err) => {
    logger.error(err, "select-users-by-email.model.js", err.stack);
    return false;
  });

  return result.rowCount;
}
