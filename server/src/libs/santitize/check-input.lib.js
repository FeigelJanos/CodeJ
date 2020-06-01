const Joi = require("@hapi/joi");

const logger = require("../../services/logger/logger");

module.exports = {
  checkEmail,
  checkUserName,
  checkRegistration,
  checkReactivation,
};

function checkEmail(email) {
  const schema = Joi.object({
    email: Joi.string().email().max(254).required(),
  });

  const input = schema.validate({ email: email });

  return input;
}

function checkUserName(user_name) {
  const schema = Joi.object({
    user_name: Joi.string().min(5).max(100).required(),
  });

  const input = schema.validate({ user_name: user_name });

  return input;
}

function checkPassword(password) {
  const schema = Joi.object({
    password: Joi.string()
      .min(10)
      .max(100)
      .required()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^]{10,200}$")),
  });

  const input = schema.validate({ password: password });
  return input;
}

function comparePasswordToRepeatPass(password, passwordAgain) {
  if (password === passwordAgain) {
    return { value: passwordAgain };
  }
  return {
    value: passwordAgain,
    error: { message: "Password and password again does not match" },
  };
}

function checkRegistration(registrationData) {
  let registrationCheckResult = [];
  registrationCheckResult.push(checkEmail(registrationData.email));
  registrationCheckResult.push(checkUserName(registrationData.userName));
  registrationCheckResult.push(checkPassword(registrationData.password));
  registrationCheckResult.push(
    comparePasswordToRepeatPass(
      registrationData.password,
      registrationData.passwordAgain
    )
  );

  return registrationCheckResult;
}

function checkReactivation(reactivationData) {
  let reactivationCheckResult = [];
  reactivationCheckResult.push(checkEmail(reactivationData.email));
  reactivationCheckResult.push(checkUserName(reactivationData.userName));
  reactivationCheckResult.push(checkPassword(reactivationData.password));
  return reactivationCheckResult;
}
