const checkInput = require('../../libs/santitize/check-input.lib')
const logger = require('../../services/logger/logger')
const selectUsersByEmail = require('../../models/sql/select-users-by-email.model')
const checkDbEntity = require('../../libs/utils/utils')

module.exports = verifyEmailController

async function verifyEmailController (req, res) {
  const verificationResult = checkInput.checkEmail(req.body.email)

  if (verificationResult.error) {
    logger.error(verificationResult.error)
    res.status(400).send({
      message: 'The email is not valid',
      email: `${req.body.email}`
    })
    return
  }

  const usersWithThisEmail = await selectUsersByEmail(req.body.email)

  if (!usersWithThisEmail) {
    res
      .status(500)
      .send({ message: 'An error occured, please try again later.' })
    return
  }

  const emailAlreadyExists = checkDbEntity.checkEntityExistence(
    usersWithThisEmail
  )

  if (emailAlreadyExists) {
    res.status(401).send({
      message: 'This email is already in use',
      email: `${req.body.email}`
    })
    return
  }

  res.status(200).send({
    message: 'No registered user with this email'
  })
}
