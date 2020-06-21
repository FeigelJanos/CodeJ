const checkSession = require("../../libs/check-session/check-session.lib");
const saveProgress = require("../../libs/save-progress/save-progress.lib");

module.exports = logoutController;

async function logoutController(req, res) {
  userLoggedIn = checkSession(req.session);

  if (!userLoggedIn) {
    res.status(400).send({ message: "You are already logged out." });
    return;
  }

  progressSaved = await saveProgress(req.session.progress, req.session.userId);

  //Remove session
}
