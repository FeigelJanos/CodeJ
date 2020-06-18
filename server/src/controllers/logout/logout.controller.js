const checkSession = require("../../libs/check-session/check-session.lib");
const { USER_TYPES } = require("../../config/nonenv-constants");

module.exports = logoutController;

async function logoutController(req, res) {
  userLoggedIn = checkSession(req.session);

  if (!userLoggedIn) {
    res.status(400).send({ message: "You are already logged out." });
    return;
  }

  //User progress into db if req.progress
  //Remove session
}
