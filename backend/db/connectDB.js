const { Client } = require('pg');

const client = new Client({
    "user": "vpsrcluq",
    "password": "RgP3R81hAv0zpUf4rhYLCD5m3xoxzT7k",
    "host": "rajje.db.elephantsql.com",
    "port": 5432,
    "database": "vpsrcluq"
});

client.connect().then(() =>
{
    console.log("Server, You Have Successfully connected to PostgreSql");
})
.catch((error) =>
{
    console.log("Server, Unable to connect to PostgreSql");
	console.error(error);
});

module.exports = client;