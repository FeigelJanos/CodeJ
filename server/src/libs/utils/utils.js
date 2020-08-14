const randomString = require('crypto-random-string')

module.exports = {
  checkEntityExistence,
  generateActivationId,
  checkIsActivationWithinTime,
  generateVerificationResponse
}

function checkEntityExistence (entity) {
  if (entity.rowCount > 0) {
    return true
  }
  return false
}

function generateActivationId () {
  return randomString({ length: 20, type: 'url-safe' })
}

function checkIsActivationWithinTime (registerDate) {
  const nowInMs = new Date().getTime()
  const registerDateInMs = new Date(registerDate).getTime()
  const oneDayInMs = 86400000

  if (nowInMs - registerDateInMs > oneDayInMs) {
    return false
  } else {
    return true
  }
}

function generateVerificationResponse (verificationresult) {
  for (const value of verificationresult) {
    if (value.error) {
      return `The ${
        Object.keys(value.value)[0]
      } field contains an invalid value`
    }
  }

  return 'Data is formally correct'
}
