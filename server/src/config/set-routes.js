const verifyEmailController = require("../controllers/verify-email/verify-email.controller");
const verifyNameController = require("../controllers/verify-name/verify-name.controller");
const registrationController = require("../controllers/registration/registration.controller");
const userActivationController = require("../controllers/user-activation/user-activation.controller");
const userReactivationController = require("../controllers/user-reactivation/user-reactivation.controller");

module.exports = setRoutes;

function setRoutes(app) {
  //GET home route
  app.get("/", async (req, res) => {
    res.send("The server is working!");
  });

  //Verify User email
  app.post("/verify-email", async (req, res) => {
    await verifyEmailController(req, res);
  });

  //Verify User name
  app.post("/verify-name", async (req, res) => {
    await verifyNameController(req, res);
  });

  //Register User
  app.post("/register", async (req, res) => {
    await registrationController(req, res);
  });

  //Activate User
  app.get("/activate/:userName/:activationToken", async (req, res) => {
    await userActivationController(req, res);
  });

  //Generate new activation url
  app.post("/reactivate", (req, res) => {
    await userReactivationController(req, res);
  });

  //Login User
  app.post("/login", (req, res) => {
    res.send("Your profile");
  });

  //Logout User
  app.post("/logout", (req, res) => {
    res.send("Your profile");
  });

  app.get("/profile", (req, res) => {
    res.send("Your profile");
  });

  app.get("/curriculum", (req, res) => {
    res.send("All available classes");
  });

  app.get("/study", (req, res) => {
    res.send("Your next lesson");
  });

  app.get("/forum", (req, res) => {
    res.send("This is the forum");
  });

  app.get("/admin", (req, res) => {
    res.send("This is the forum");
  });
}
