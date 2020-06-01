const db = require("../../interfaces/postgres-interfaces/db-connect");
const logger = require("../../services/logger/logger");

module.exports = updateReactivatedUser;

async function updateReactivatedUser(userId, activationId) {
  const now = new Date();
  const query = `UPDATE users SET update_date = ($1), status = ($2), activation_id = ($3) WHERE user_id = ($4)`;
  const params = [now, "refreshed", activationId, userId];
  const result = await db.query(query, params).catch((err) => {
    logger.error(err, "update-activated-user.model.js", err.stack);
    return false;
  });

  return result.rowCount;
}
