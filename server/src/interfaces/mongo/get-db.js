const { mongo } = require("../../config/config");
const mongoClient = require("mongodb").MongoClient(
  `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`,
  { useUnifiedTopology: true }
);

async function getClient() {
  const client = await mongoClient.connect().catch((err) => {
    console.log(err);
  });
  return client;
}

async function getDb() {
  const client = await mongoClient.connect().catch((err) => {
    console.log(err);
  });
  const db = client.db(`${mongo.database}`);
  console.log(db);
  return db;
}

async function getCollection(collectionName) {
  const client = await mongoClient.connect().catch((err) => {
    console.log(err);
  });
  const db = client.db(`${mongo.database}`);
  const collection = db.collection(collectionName);
  return collection;
}

module.exports = { getClient, getDb, getCollection };
