const nodemailer = require('nodemailer')
const { mail } = require('../../config/config')
const logger = require('../logger/logger')

module.exports = sendEmail

async function sendEmail (mailOptions) {
  const transporter = nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    auth: {
      user: mail.user,
      pass: mail.password
    }
  })

  const info = await transporter.sendMail(mailOptions).catch((err) => {
    logger.error(err, 'send-email.js', err.stack)
    return false
  })

  if (info === false) {
    return false
  } else {
    logger.log('Email sent with: ' + info, 'send-email.js', 1)
    return true
  }
}
