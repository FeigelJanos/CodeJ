const selectUserByEmailAndName = require('../../models/sql/select-user-by-email-and-name.model')
const { checkReactivation } = require('../../libs/santitize/check-input.lib')
const {
  generateVerificationResponse,
  generateActivationId
} = require('../../libs/utils/utils')
const { comparePassword } = require('../../services/crypto/encrypt-decrypt')
const updateReactivatedUser = require('../../models/sql/update-reactivated-user.model')
const sendRepeatActivationEmail = require('../../models/email/repeat-activation-email')
const logger = require('../../services/logger/logger')

module.exports = userReactivationController

async function userReactivationController (req, res) {
  const verificationResponse = getVerificationResult(req.body)
  if (verificationResponse !== 'Data is formally correct') {
    res.status(400).send({
      message: verificationResponse
    })
    return
  }

  const foundUser = await selectUserByEmailAndName(
    req.body.email,
    req.body.userName
  )

  if (foundUser.length > 1 || foundUser === false) {
    if (foundUser.length > 1) {
      logger.error(
        `Multiple users found to email: ${req.body.email} and userName: ${req.body.userName}`,
        'user-reactivation.controller',
        false,
        3
      )
    }
    res
      .status(500)
      .send({ message: 'An error occured, please try again later.' })
    return
  }

  if (foundUser.length === 0) {
    res.status(400).send({ message: 'No such user was found.' })
    return
  }
  if (foundUser[0].status === 'active') {
    res.status(400).send({ message: 'User already registered.' })
    return
  }
  if (foundUser[0].status !== 'registered') {
    res.status(400).send({ message: 'User cannot be activated.' })
    return
  }

  const passMatches = await comparePassword(
    req.body.password,
    foundUser[0].password
  )

  if (!passMatches) {
    res.status(400).send({ message: 'Incorrect username or password.' })
    return
  }

  const activationCode = generateActivationId()

  const update = await updateReactivatedUser(
    foundUser[0].user_id,
    activationCode
  )

  if (update !== 1) {
    if (update !== false) {
      logger.error(
        `Multiple users updated with email: ${req.body.email} and userName: ${req.body.userName}`,
        'user-reactivation.controller',
        false,
        3
      )
    }
    res
      .status(500)
      .send({ message: 'An error occured, please try again later.' })
    return
  }

  const mailSent = await sendRepeatActivationEmail(
    activationCode,
    req.body.userName,
    req.body.email
  )

  if (!mailSent) {
    logger.error(
      `Email unsuccesfully sen to email: ${req.body.email} with userName: ${req.body.userName}`,
      'user-reactivation.controller',
      false,
      3
    )
    res
      .status(500)
      .send({ message: 'An error occured, please try again later.' })
    return
  }

  res.status(200).send({
    message:
      'Your reactivation was sucessfull! We sent a new activation email to your address.'
  })
}

function getVerificationResult (reactivastionData) {
  const verificationresult = checkReactivation(reactivastionData)

  return generateVerificationResponse(verificationresult)
}
