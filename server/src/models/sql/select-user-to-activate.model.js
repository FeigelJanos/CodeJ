const db = require('../../interfaces/postgres-interfaces/db-connect')
const logger = require('../../services/logger/logger')

module.exports = selectUserToActivate

async function selectUserToActivate (user_name, activation_id) {
  const query = 'SELECT user_id, update_date FROM users WHERE user_name = $1 AND activation_id = $2 AND status != $3 AND status != $4 AND activation_id != $5'

  const result = await db
    .query(query, [user_name, activation_id, 'banned', 'active', 'Activated'])
    .catch((err) => {
      logger.error(err, 'select-users-by-email.model.js', err.stack)
      return false
    })

  return result.rows
}
