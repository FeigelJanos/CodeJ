const updateActivatedUser = require('../../models/sql/update-activated-user.model')
const selectUserToActivate = require('../../models/sql/select-user-to-activate.model')
const { checkIsActivationWithinTime } = require('../../libs/utils/utils')
const logger = require('../../services/logger/logger')

module.exports = userActivationController

async function userActivationController (req, res) {
  const userToActivate = await selectUserToActivate(
    req.params.userName,
    req.params.activationToken
  )

  if (
    !userToActivate ||
    userToActivate.length > 1 ||
    typeof userToActivate[0].update_date !== 'object' ||
    typeof userToActivate[0].user_id !== 'number'
  ) {
    if (userToActivate !== false) {
      logger.error(
        `User selection error with userName: ${req.body.userName}`,
        'user-activation.controller',
        false,
        3
      )
    }
    res
      .status(500)
      .send({ message: 'An error occured, please try again later.' })
    return
  }

  if (userToActivate.length < 1) {
    res.status(400).send({
      message:
        "Can't find unactivated user with these parameters. If the url is correct, perhaps you are already activated."
    })
    return
  }

  const userCanBeUpdated = checkIsActivationWithinTime(
    userToActivate[0].update_date
  )

  if (!userCanBeUpdated) {
    res.status(400).send({
      message:
        'Your registration has expired, if you want to activate your registration please reactivate your account.'
    })
    return
  }

  const update = await updateActivatedUser(userToActivate[0].user_id)

  if (update === 1) {
    res
      .status(200)
      .send({ message: 'Your account has been succesfully activated!' })
  } else {
    if (update !== false) {
      logger.error(
        `User activation update error with userName: ${req.body.userName} and userId ${userToActivate[0].user_id}`,
        'user-activation.controller',
        false,
        3
      )
    }
    res
      .status(500)
      .send({ message: 'An error occured, please try again later.' })
  }
}
