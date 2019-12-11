const client = require('./connectDB');

const runUserTable = client.query("CREATE TABLE IF NOT EXISTS users ( Id SERIAL PRIMARY KEY, name TEXT NOT NULL)", (err, res) =>
{
    console.log(err, res);
});

module.exports = runUserTable;