const bcrypt = require('bcrypt')

module.exports = { encryptPassword, comparePassword }

async function encryptPassword (password) {
  const hashed = await bcrypt.hash(password, 12).catch((err) => {
    logger.error(err, 'encrypt-decrypt.js', err.stack)
    return false
  })
  return hashed
}

async function comparePassword (password, hash) {
  const compared = await bcrypt.compare(password, hash).catch((err) => {
    logger.error(err, 'encrypt-decrypt.js', err.stack)
    return false
  })
  return compared
}
