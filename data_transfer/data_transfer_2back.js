/* ---envs--- */
const IP = process.env.RRIP;
const CRYPTOKEY = process.env.RRCRYPTOKEY;
const WHOAMI = process.env.RRWHOAMI;
/* ---Dependencies--- */
const net = require('net');
/* ---My Files--- */
const { create_iv, encrypt_data, decrypt_data } = require('.././encrypt');
const { data_redirect } = require('./data_redirect');
const { validate_packed_data, validate_sealed_data_package } = require('./data_transfer_validate');

function data_packing(data, type) {
    try {
        const iv = create_iv();
        const iv1 = create_iv();
        const iv2 = create_iv();
        const encrypted_data = encrypt_data(data, CRYPTOKEY, iv1);
        const whoami = encrypt_data(WHOAMI, CRYPTOKEY, iv2);
        const data_package = {
            encrypted_data: encrypted_data,
            iv1: iv1,
            whoami: whoami,
            iv2: iv2,
            type: type
        };

        const data_package_encrypted = encrypt_data(data_package, CRYPTOKEY, iv);
        const sealed_data_package = {
            data_package_encrypted: data_package_encrypted,
            iv: iv
        }
        return sealed_data_package;
    } catch {
        return null;
    }
}

function data_unpacking(data_to_unpack) {
    return new Promise((resolve, reject) => {
        let sealed_data_package = JSON.parse(data_to_unpack);
        if (!validate_sealed_data_package(sealed_data_package)) { reject("Data Missing @ RRBDT"); }
        const data_package = decrypt_data(sealed_data_package.data_package_encrypted, CRYPTOKEY, sealed_data_package.iv);
        const whoareyou = decrypt_data(data_package.whoami, CRYPTOKEY, data_package.iv2);
        if (whoareyou !== "test") { reject("Data Corrupted @ RRBDT"); }
        else {
            const decrypted_data = decrypt_data(data_package.encrypted_data, CRYPTOKEY, data_package.iv1);
            const data_to_handle = {
                decrypted_data: decrypted_data,
                type: data_package.type
            }
            resolve(data_to_handle);
        }
        reject("error @ RRBDT");
    });
}

const server = net.createServer((socket) => {
    socket.setTimeout(14000);

    if (socket.remoteAddress === IP) {
        socket.on('data', (data) => {
            console.log("\n-----Socket Opened!-----");
            data_unpacking(data)
                .then((response) => {
                    /* ---Decides how to handle each request--- */
                    data_redirect(response)
                        .then((server_response) => {
                            const server_response_encrypted = data_packing(server_response , "success");
                            if (!validate_packed_data(server_response_encrypted)) {
                                socket.end();
                            } else {
                                socket.write(JSON.stringify(server_response_encrypted));
                                socket.end();
                            }
                        })
                        .catch((server_error) => {
                            const server_error_encrypted = data_packing(server_error, "error");
                            if (!validate_packed_data(server_error_encrypted)) {
                                socket.end();
                            } else {
                                socket.write(JSON.stringify(server_error_encrypted));
                                socket.end();
                            }
                        });

                    //console.log("server_response", server_response);
                    /* ---std for sending a response--- */
                    /*const placebo = data_packing(response, "success");
                    if (!validate_packed_data(placebo)) {
                        socket.end();
                    } else {
                        socket.write(JSON.stringify(placebo));
                        socket.end();
                    }   */                 
                })
                .catch((error) => {
                    const server_response = data_packing(error, 'error');
                    if (!validate_packed_data(server_response)) {
                        socket.end();
                    } else {
                        socket.write(JSON.stringify(server_response));
                        socket.end();
                    }
                });

            //let test = data_packing("APIFVDBUIPG", "error");

            //socket.write(JSON.stringify(test));
            //socket.end();

        });
        /* ---socket closed--- */
        socket.on('timeout', () => {
            const timeout = data_packing("Connection timed out @ RRDDT", "error");
            if (!validate_packed_data(timeout)) {
                socket.destroy();
            } else {
                socket.write(JSON.stringify(timeout));
                socket.end();
            }
        });
        socket.on('end', () => {
            console.log('-----Socket Closed!-----\n');
        });
        socket.on('error', (err) => {
            socket.destroy();
        });
    }
    //Unauthorized Ips
    else {
        socket.destroy();
        //send text msg?
    }
});

module.exports = { server };