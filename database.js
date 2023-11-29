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
                console.error('Error getting connection:', err);
                reject(err);
                return;
            }

            connection.query(query, data, (error, results) => {
                connection.release(); // Release the connection back to the pool

                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                    return;
                }

                // Results will contain the rows that match the email and password
                resolve(results);
            });
        });
    });
}

module.exports = { query_database };