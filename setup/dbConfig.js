const { Pool, Client } = require('pg')

const dbURL =require("./connect").postgresURL;
const db = new Client({
    connectionString : dbURL
})

module.exports = { db };