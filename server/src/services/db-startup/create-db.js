const db = require('../../interfaces/postgres-interfaces/db-connect')
const logger = require('../logger/logger')

async function createDb (sqlQueryList) {
  for (const queryObj of sqlQueryList) {
    logger.log(`Creating ${queryObj.name} table...`)

    await db.query(queryObj.query, queryObj.params).catch((err) => {
      logger.error(err, 'create-db.js', err.stack)
      process.exit(-1)
    })
  }
}

module.exports = createDb
