/*const { mongo } = require("../../config/config");
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`;
let db;

function connectToServer(callback) {
  MongoClient.connect(
    urlMongo,
    { useUnifiedTopology: true, useNewUrlParser: true },
    function (err, client) {
      db = client.db("auth");
      return callback(err);
    }
  );
}

function getDb() {
  return db;
}

module.exports = { connectToServer, getDb };

/*const { mongo } = require("../../config/config");
const mongoClient = require("mongodb").MongoClient(
  `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`,
  { useUnifiedTopology: true }
);

async function runMongoTransaction(collectionName, transactionParams) {
  const client = await mongoClient.connect().catch((err) => {
    console.log(err);
  });
  const db = client.db(`${mongo.database}`);
  const collection = db.collection(collectionName);

  switch (transactionParams.transactionType) {
    case "insertOne":
      await collection
        .insertOne(transactionParams.query)
        .catch((err) => console.error(err));
      break;
  }

  client.close();
}

module.exports = runMongoTransaction;*/
