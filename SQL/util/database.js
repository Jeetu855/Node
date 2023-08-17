const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'password',
});

module.exports = pool.promise();

// mysql.createConnection({}) : need to create separate connection for each query
// mysql.createPool({}) : can run multiple queries, each query requires a connection
// so once a query is completed its creates another connection for next query automatically
// each query returns a promise, since we are using pool.promise()
