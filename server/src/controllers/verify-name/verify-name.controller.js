const checkInput = require("../../libs/santitize/check-input.lib");
const logger = require("../../services/logger/logger");
const selectUsersByEmail = require("../../models/sql/select-users-by-email.model");
const checkDbEntity = require("../../libs/utils/utils");

module.exports = verifyNameController;

async function verifyNameController(req, res) {
  const verificationResult = checkInput.checkUserName(req.body.userName);

  if (verificationResult.error) {
    logger.error(verificationResult.error);
    res.status(400).send({
      message: `The username is not valid`,
      userName: `${req.body.userName}`,
    });
    return;
  }

  const usersWithThisName = await selectUsersByEmail(req.body.userName);

  if (!usersWithThisName) {
    res
      .status(500)
      .send({ message: "An error occured, please try again later." });
    return;
  }

  const userAlreadyExists = checkDbEntity.checkEntityExistence(
    usersWithThisName
  );

  if (userAlreadyExists) {
    res.status(401).send({
      message: "This username is already in use",
      userName: `${req.body.userName}`,
    });
    return;
  }

  res.status(200).send({
    message: "No registered user with this username",
  });
  return;
}
