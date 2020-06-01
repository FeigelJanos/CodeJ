const { Pool } = require('pg')
const {postgress} = require('../../config/config')
const pool = new Pool( {
    user: postgress.user,
    password: postgress.password,
    host: postgress.host,
    port: postgress.port,
    database: postgress.database
})

const logger = require('../../services/logger/logger')
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })


module.exports = {
  query: async (text, params) => {
    const start = Date.now()
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    logger.log({ text, duration, rows: result.rowCount }, 'db-connect', 1)
    return result
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args
        return query.apply(client, args)
      }
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error(`The last executed query on this client was: ${client.lastQuery}`)
      }, 5000)
      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err)
        // clear our timeout
        clearTimeout(timeout)
        // set the query method back to its old un-monkey-patched version
        client.query = query
      }
      callback(err, client, release)
    })
  }
}
