const insertLog = async (logs, log) => {
  try {
    const results = await logs.insertOne(log);
    return results.ops[0];
  } catch (e) {
    throw e;
  }
};

module.exports = insertLog;
