/* ---Dependencies--- */
const mysql = require('mysql');

/* ---database--- */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'adm_user_data',
    connectionLimit: 10,
    idleTimeoutMillis: 3600000 // 1 hour
});

function query_database(query, data) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(query, data, (error, results) => {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    });
}

module.exports = { query_database };