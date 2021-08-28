const mysql = require('mysql')
const { mySqlConnectionConfig } = require('./config')

const connection = mysql.createConnection(mySqlConnectionConfig)
connection.connect()

module.exports = { connection }