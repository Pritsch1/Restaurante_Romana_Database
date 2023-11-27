/* ---envs--- */
const IP = process.env.RRIP;
const CRYPTOKEY = process.env.RRCRYPTOKEY;
const WHOAMI = process.env.RRWHOAMI;
/* ---Dependencies--- */
const net = require('net');
/* ---My Files--- */
const { create_iv, encrypt_data, decrypt_data } = require('./encrypt');
const { data_redirect } = require('./data_redirect');

function data_packing(data, type) {
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
}

function data_unpacking(data_to_unpack) {
    return new Promise((resolve, reject) => {
        let sealed_data_package = JSON.parse(data_to_unpack);
        const data_package = decrypt_data(sealed_data_package.data_package_encrypted, CRYPTOKEY, sealed_data_package.iv);
        const whoareyou = decrypt_data(data_package.whoami, CRYPTOKEY, data_package.iv2);
        if (whoareyou !== "test") { reject("Unable to Unpack Data @ RRDDT"); }
        else {
            const decrypted_data = decrypt_data(data_package.encrypted_data, CRYPTOKEY, data_package.iv1);
            const data_to_handle = {
                decrypted_data: decrypted_data,
                type: data_package.type
            }
            resolve(data_to_handle);
        }
        reject("error @ RRDDT");
    });
}


const server = net.createServer((socket) => {
    socket.setTimeout(8000);

    if (socket.remoteAddress === IP) {
            socket.on('data', (data) => {
                console.log("\n-----Socket Opened!-----");
                //const test2 = data_unpacking(data);
                console.log(data);
                /*data_unpacking(data)
                    .then((response) => {
                        console.log("Data has been processed:", response);
                        const server_response = {
                            status: "success",
                            message: response
                        }
                        socket.write(JSON.stringify(server_response));
                        socket.end();
                    })
                    .catch((error) => {
                        console.error('Error processing data:', error);
                        const server_response = {
                            status: "error",
                            message: error
                        }
                        socket.write(JSON.stringify(server_response));
                        socket.end();
                    });*/
                const test = data_packing("APIFVDBUIPG", "error");
                socket.write(JSON.stringify(test));
                socket.end();
            });
            /* ---socket closed--- */
            socket.on('timeout', () => {
                console.log('Socket timed out');
                //socket.write(JSON.stringify("aaa"));
                socket.destroy();
            });
            socket.on('end', () => {
                console.log('-----Socket Closed!-----\n');
            });
            socket.on('error', (err) => {
                console.error('Error:', err.message);
            });
    }
    //Unauthorized Ips
    else {
        socket.destroy();//Force closure
        //send text msg?
    }
});

module.exports = { server };