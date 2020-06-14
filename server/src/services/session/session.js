const { getClient } = require("../../interfaces/mongo/get-db");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const sessionStore = new MongoStore({
  clientPromise: getClient(),
  dbName: "codej",
});
const ONE_DAY = 1000 * 60 * 60 * 24;
const sessionObject = {
  name: process.env.SESSION_NAME,
  cookie: {
    maxAge: ONE_DAY,
    sameSite: true,
    secure: true,
  },
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
};

module.exports = sessionObject;
