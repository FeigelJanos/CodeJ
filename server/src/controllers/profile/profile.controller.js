module.exports = profileController;

async function profileController(req, res) {
  const userLoggedIn = checkSession(req.session);

  if (!userLoggedIn) {
    res.status(400).send({ message: "You are not logged in." });
  }
}
