module.exports = checkSession

function checkSession (session) {
  if (!session.userId && !session.userName && !session.role) {
    return false
  }
  return true
}
