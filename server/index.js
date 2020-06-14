const process = require("process");
const result = require("dotenv").config({
  path: __dirname + `\\.env.${process.env.NODE_ENV}`,
});
if (result.error) {
  throw result.error;
}

const app = require("express")();
const https = require("https");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const sqlQueryList = require("./src/services/db-startup/startup-sql-query-list");
const logger = require("./src/services/logger/logger");
const setRoutes = require("./src/config/set-routes");
const createDb = require("./src/services/db-startup/create-db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

logger.log(
  `=== PROCESS STARTED AT PORT ${process.env.SERVER_PORT} ===`,
  null,
  0
);
setRoutes(app);

https
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "./key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "./cert.pem")),
      passphrase: "elf000",
    },
    app
  )
  .listen(process.env.SERVER_PORT || 3000, createDb(sqlQueryList));
