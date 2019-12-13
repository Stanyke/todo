const client = require('./connectDB');

const runTodoTable = client.query("CREATE TABLE IF NOT EXISTS user_tasks ( Id SERIAL PRIMARY KEY, description TEXT NOT NULL, state TEXT NOT NULL, user_id VARCHAR (50) NOT NULL)", (err, res) =>
{
    console.log(err, res);
});

module.exports = runTodoTable;