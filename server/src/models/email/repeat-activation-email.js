const sendEmail = require('../../services/mailer/send-email')
const { server } = require('../../config/config')

module.exports = sendRepeatActivationEmail

async function sendRepeatActivationEmail (activationId, userName, mail) {
  const mailOptions = {
    from: 'codej.registration@codej.com',
    to: `${mail}`,
    subject: 'CodeJ Repeat Activation Email',
    html: ` <h3>Hi ${userName},</h3>
            <p>Welcome to the CodeJ community.</p>
            <p>To activate your account please click on the link below or paste the link in your browser within 24 hours of recieving this message.</p>
            <a href="https://${server.host}:${server.port}/activate/${userName}/${activationId}">https://${server.host}:${server.port}/activate/${userName}/${activationId}</a>
            <p>Please note that this is a repeat activation message. To avoid spamming, we will not send any new activation email to this address. 
            If your account activation was unsuccesfull, please contact us directly at support@codej.com </p>
            <p>You’re receiving this email because you recently created a new CodeJ account or added a new email address. If this wasn’t you, please ignore this email. </p>`
  }

  const sucess = await sendEmail(mailOptions)
  if (!sucess) {
    return false
  }
  return true
}
