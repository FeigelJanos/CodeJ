const db = require('../../interfaces/postgres-interfaces/db-connect')
const logger = require('../../services/logger/logger')

module.exports = selectUsersByUserName

async function selectUsersByUserName (user_name) {
  const query = 'SELECT * FROM users WHERE user_name = $1'

  const result = await db.query(query, [user_name]).catch((err) => {
    logger.error(err, 'select-users-by-username.model.js', err.stack)
    return false
  })

  return result
}
