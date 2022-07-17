const mysql = require('mysql');
// Para pasar callbacks a promesas (o async/await)
// utilizo un modulo de node que se llama util
const { promisify } = require('util');
const { database } = require('./keys');


const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("DATABASE HAS TO MANY CONNECTIONS");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
        console.log(err.sqlMessage);
    }
    if (connection) {
        connection.release();
        console.log("DB is connected");
    }
    return;
});

// Promosify pool queries
pool.query = promisify(pool.query);

module.exports = pool;