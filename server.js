/* ---Dependencies--- */
require('dotenv').config();
/* ---envs--- */
const NODEENV = process.env.RRNODE_ENV;
const NET_PORT = process.env.RRNET_PORT;
/* ---My Files--- */
const { server } = require('./data_transfer/data_transfer_2back');
/* --- net --- */
server.listen(NET_PORT,  () => {
    console.log(`net Running! Port: ${NET_PORT}`);
});

/*
const MAX_CONNECTIONS = 10; // Maximum number of allowed connections
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Maximum allowed requests per minute

// Track active connections
const activeConnections = new Set();

// Track incoming requests and their timestamps
const requestTimestamps = new Map();

const unpack_data = (data_to_unpack, clientAddress) => {
    // Implement rate limiting for requests
    const currentTime = Date.now();

    const requestCount = requestTimestamps.get(clientAddress) || [];
    requestCount.push(currentTime);

    // Remove old timestamps
    requestCount = requestCount.filter((timestamp) => currentTime - timestamp < RATE_LIMIT_WINDOW);

    if (requestCount.length > RATE_LIMIT_MAX_REQUESTS) {
        return "Rate limit exceeded. Please try again later.";
    }

    requestTimestamps.set(clientAddress, requestCount);

    // Continue with the data unpacking process
    let unpacked_data = JSON.parse(data_to_unpack);
}

const server = net.createServer((socket) => {
    if (socket.remoteAddress === IP) {
        // Check if the maximum number of connections has been reached
        if (activeConnections.size >= MAX_CONNECTIONS) {
            socket.write('Connection limit exceeded. Please try again later.\r\n');
            socket.end();
            return;
        }

        // Add the connection to the active connections set
        activeConnections.add(socket);

        socket.on('data', (data) => {
            console.log("\n-----Socket Opened!-----");
            const server_response = unpack_data(data, socket.remoteAddress);
            socket.write(JSON.stringify(server_response));
            socket.end();
        });

        socket.on('end', () => {
            activeConnections.delete(socket);
            console.log('-----Socket Closed!-----\n');
        });

        socket.on('error', (err) => {
            console.error('Error:', err.message);
            socket.end();
        });
    } else {
        // Unauthorized Ips
        socket.write("Unauthorized Access! GTFO!");
        socket.end();
        // Send a text message?
    }


    Correctly configure the server timeouts, so that connections that are idle or where requests are arriving too slowly can be dropped. 
    See the different timeouts in http.Server, particularly headersTimeout, requestTimeout, timeout, and keepAliveTimeout.

Tell me more
});*/

//const { type } = require('os'); ?!?!?!?!