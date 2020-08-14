const db = require('../../interfaces/postgres-interfaces/db-connect')
const logger = require('../../services/logger/logger')

module.exports = insertFinishedLessons

async function insertFinishedLessons (lessons, userId) {
  const now = new Date()
  const query = 'INSERT INTO user_lessons (user_id, ) VALUES ($1, )'
  const params = [userId]
  const result = await db.query(query, params).catch((err) => {
    logger.error(err, 'insert-new-user.model.js', err.stack)
    return false
  })

  return result.rows
}
