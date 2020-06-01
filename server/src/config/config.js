const config = {
  session: {
    secret: process.env.SESSION_SECRET,
    expiresIn: process.env.SESSION_EXPIRES_IN,
    name: process.env.SESSION_NAME,
  },
  postgress: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },
};

module.exports = config;
