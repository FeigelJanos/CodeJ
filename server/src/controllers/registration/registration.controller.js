const { encryptPassword } = require("../../services/crypto/encrypt-decrypt");
const insertNewUser = require("../../models/sql/insert-new-user.model");
const { generateActivationId } = require("../../libs/utils/utils");
const sendActivationEmail = require("../../models/email/activation-email");
const selectUserByNameOrEmail = require("../../models/sql/select-user-by-name-or-email.model");
const { generateVerificationResponse } = require("../../libs/utils/utils");
const { checkRegistration } = require("../../libs/santitize/check-input.lib");

module.exports = registrationController;

async function registrationController(req, res) {
  const verificationResponse = getVerificationResult(req.body);

  if (verificationResponse !== "Data is formally correct") {
    res.status(400).send({
      message: verificationResponse,
      registrationData: req.body,
    });
    return;
  }

  const userAlreadyRegistered = await selectUserByNameOrEmail(
    req.body.email,
    req.body.userName
  );

  if (userAlreadyRegistered > 0) {
    res.status(400).send({
      message: "User already registered with this email or username.",
      registrationData: req.body,
    });
    return;
  } else if (userAlreadyRegistered === false) {
    res
      .status(500)
      .send({ message: "An error occured, please try again later." });
    return;
  }

  const hashedPass = await encryptPassword(req.body.password);

  if (hashedPass === false) {
    res
      .status(500)
      .send({ message: "An error occured, please try again later." });
    return;
  }

  const activationId = generateActivationId();

  const mailSent = await sendActivationEmail(
    activationId,
    req.body.userName,
    req.body.email
  );

  if (!mailSent) {
    res
      .status(500)
      .send({ message: "An error occured, please try again later." });
    return;
  }

  const insert = await insertNewUser(req.body, hashedPass, activationId);

  if (insert === false) {
    res
      .status(500)
      .send({ message: "An error occured, please try again later." });
  }

  res.status(200).send({
    message:
      "Your registration was sucessfull! We sent an activation mail to your email address.",
    registrationData: req.body,
  });
  return;
}

function getVerificationResult(registrationData) {
  const verificationresult = checkRegistration(registrationData);

  return generateVerificationResponse(verificationresult);
}
