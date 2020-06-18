const db = require("../../interfaces/postgres-interfaces/db-connect");
const logger = require("../../services/logger/logger");

module.exports = insertNewUser;

async function insertNewUser(registrationData, hashedPass, activationId) {
  const now = new Date();
  const query = `INSERT INTO users (email, user_name, password, activation_id, user_type, status, activity, register_date, update_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  const params = [
    registrationData.email,
    registrationData.userName,
    hashedPass,
    activationId,
    "user",
    "registered",
    "{}",
    now,
    now,
  ];
  const result = await db.query(query, params).catch((err) => {
    logger.error(err, "insert-new-user.model.js", err.stack);
    return false;
  });

  return result;
}
