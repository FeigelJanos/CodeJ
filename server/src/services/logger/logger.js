const chalk = require("chalk");
const { inspect } = require("util");

const logger = exports;

logger.log = function (message, context, level) {
  const timestamp = generateTimestamp();
  let contextString = "";
  if (context) {
    contextString = ` From: ${context}`;
  }

  if (level === 0) {
    console.log(chalk.blue.bold(` ${message}${contextString}`));
  }
  if (level === 1) {
    console.log(chalk.blue.bold(` ${inspect(message)}${contextString}`));
  } else {
    console.log(
      chalk.bgGreen.black(`${timestamp} `) +
        ` - ` +
        chalk.green(` ${message}${contextString}`)
    );
  }
};

logger.error = function (message, context, stack, level) {
  const timestamp = generateTimestamp();
  let contextString = "";
  if (context) {
    contextString = ` From: ${context}`;
  }
  if (stack) {
    console.error(
      chalk.bgYellow(`${timestamp} `) +
        ` - ` +
        `${contextString} Error stack: ${stack}`
    );
  } else {
    console.error(
      chalk.bgYellow(`${timestamp} `) +
        ` - ` +
        chalk.red(` ${message}`) +
        `${contextString}`
    );
  }
};

function generateTimestamp() {
  const now = new Date().toLocaleString();
  return now;
}
