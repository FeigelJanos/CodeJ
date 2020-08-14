const checkSession = require("../../libs/check-session/check-session.lib");
const saveProgress = require("../../libs/save-progress/save-progress.lib");

module.exports = logoutController;

async function logoutController(req, res) {
  const userLoggedIn = checkSession(req.session);

  if (!userLoggedIn) {
    res.status(400).send({ message: "You are already logged out." });
    return;
  }

  const progressSaved = await saveProgress(
    req.session.cookie.progress,
    req.session.userId
  );

  // Remove session
}
