/* ---envs--- */
const DB_IP = process.env.RRDB_IP;
const DB_PORT = process.env.RRDB_PORT;
/* ---My Files--- */
const { validate_signin, validate_signup } = require('./validate');
const { create_iv, encrypt_data, decrypt_data } = require('../encrypt');
const { generate_adm_jwt_token } = require('./generate_token');
/* ---Dependencies--- */
const net = require('net');

async function handle_adm_signin(unpacked_data) {
    try {
        const front_data = decrypt_data(unpacked_data.front_encrypted_data, unpacked_data.iv1);
        if (validate_signin(front_data) === true) {
            console.log("handle_adm_signin()", front_data);
            return await send_data(front_data);
        }
        return Promise.reject("ERROR: RRS_h_a_a_36");
    } catch (error) {
        throw error;
    }
}

async function handle_adm_signup(unpacked_data) {
    try {
        const front_data = decrypt_data(unpacked_data.front_encrypted_data, unpacked_data.iv1);
        if (validate_signup(front_data) === true) {
            console.log(front_data);
            return await send_data(front_data);
        }
        return "ERROR: RRS_h_a_a_45";
    } catch {
        return error;
    }
}

module.exports = { handle_adm_signin, handle_adm_signup };


/*function send_data(front_data) {
    return new Promise((resolve, reject) => {
        const client = net.createConnection(DB_PORT, DB_IP, () => {
            console.log("\n-----Socket Opened!-----")
            //const ready_data = prepare_data(front_data, type);
            client.write(JSON.stringify(front_data));
        });
        client.on('data', (db_data) => {
            const received_data = JSON.parse(db_data);
            console.log('Incomming Data:', received_data);
            if (received_data.status === "success") {
                resolve(generate_adm_jwt_token(front_data));
            } else if (received_data.status === "error") {
                reject(received_data.message);
            } else {
                reject("Lord Only Knows");
            }
            client.end();
        });
        client.on('end', () => {
            console.log('-----Socket Closed!-----\n');
        });
        client.on('error', (err) => {
            console.error('Error:', err.message);
            reject("ERROR: RRS_h_a_a_25");//RRS foldername _h_a_a_ fileinitial xx Line
        });
    });
}*/