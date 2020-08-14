const { mongo } = require('../../config/config')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const sessionStore = new MongoStore({
  url: `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`
})
const ONE_DAY = 1000 * 60 * 60 * 24
const sessionObject = {
  name: process.env.SESSION_NAME,
  cookie: {
    maxAge: ONE_DAY,
    sameSite: true,
    secure: true
  },
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: sessionStore
}

module.exports = sessionObject
