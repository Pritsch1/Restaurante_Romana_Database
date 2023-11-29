/* ---Dependencies--- */
const validator = require('validator');
const zxcvbn = require('zxcvbn');

function validate_signin(data) {
    if (
        data &&
        typeof data === 'object' &&
        data.hasOwnProperty('email') &&
        data.hasOwnProperty('password') &&
        data.hasOwnProperty('keep_connected') &&
        data.hasOwnProperty('location') &&
        typeof data.email === 'string' &&
        typeof data.password === 'string' &&
        typeof data.keep_connected === 'boolean' &&
        typeof data.location === 'object' &&
        validator.isEmail(data.email) === true
    ) { return true; }
    return false;
}

function validate_signup(data) {
    if (
        data &&
        typeof data === 'object' &&
        data.hasOwnProperty('email') &&
        data.hasOwnProperty('password') &&
        data.hasOwnProperty('phone') &&
        data.hasOwnProperty('location') &&
        typeof data.email === 'string' &&
        typeof data.password === 'string' &&
        typeof data.phone === 'string' &&
        typeof data.location === 'object' &&
        validator.isEmail(data.email) === true        
    ) { return true; }
    return false;
}

module.exports = { validate_signin, validate_signup };