const { checkLogin } = require('../../libs/santitize/check-input.lib')
const { generateVerificationResponse } = require('../../libs/utils/utils')
const selectUsersByEmail = require('../../models/sql/select-users-by-email.model')
const selectUsersByUserName = require('../../models/sql/select-users-by-username.model')
const logger = require('../../services/logger/logger')
const { comparePassword } = require('../../services/crypto/encrypt-decrypt')
const { EMPTY_PROGRESS } = require('../../config/nonenv-constants')
const session = require('express-session')

module.exports = loginController

async function loginController (req, res) {
  if (
    (req.session.userId && req.session.userId.length > 0) ||
    (req.session.userName && req.session.userName.length > 0) ||
    (req.session.role && req.session.role.length > 0)
  ) {
    res.status(400).send({ message: 'Already logged in.' })
    return
  }
  const verificationResponse = getLoginResult(req.body)

  if (verificationResponse !== 'Data is formally correct') {
    res.status(400).send({
      message: verificationResponse,
      registrationData: req.body
    })
    return
  }

  let selectedUser
  if (req.body.email) {
    selectedUser = await selectUsersByEmail(req.body.email)
  } else if (req.body.userName) {
    selectedUser = await selectUsersByUserName(req.body.userName)
  }

  if (selectedUser === false) {
    res
      .status(500)
      .send({ message: 'An error occured, please try again later.' })
    return
  } else if (selectedUser.rowCount === 0) {
    res.status(400).send({ message: 'Wrong username or password.' })
    return
  } else if (selectedUser.rowCount > 1) {
    logger.error(
      `Multiple users found to email: ${
        req.body.email || 'No email given'
      } or userName: ${req.body.userName || 'No userName given'}`,
      'login.controller',
      false,
      3
    )
    res
      .status(500)
      .send({ message: 'An error occured, please try again later.' })
    return
  }

  const passwordMatches = await comparePassword(
    req.body.password,
    selectedUser.rows[0].password
  )

  if (!passwordMatches) {
    res.status(400).send({ message: 'Wrong username or password.' })
    return
  }

  req.session.userId = `${selectedUser.rows[0].user_id}`.trim()
  req.session.userName = `${selectedUser.rows[0].user_name}`.trim()
  req.session.role = `${selectedUser.rows[0].user_type}`.trim()
  req.session.progress = EMPTY_PROGRESS

  res.status(200).send({ message: 'Succesfull login' })
}

function getLoginResult (loginData) {
  const verificationResult = checkLogin(loginData)

  return generateVerificationResponse(verificationResult)
}
