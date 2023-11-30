/* ---envs--- */
const JWT_ADM_KEY = process.env.RRJWT_ADM_KEY;
/* ---Dependencies--- */
const jwt = require('jsonwebtoken');

function generate_adm_jwt_token(user) {
    const obj = user;
    const token = jwt.sign(user, JWT_ADM_KEY, { expiresIn: '5min' });

    return token;
}

function verify_adm_jwt_token(token) {
    try {
        const decoded = jwt.verify(token, JWT_ADM_KEY);
        console.log(jwt.decoded);
        return decoded;
    } catch (error) {
        // If the token is invalid or expired, jwt.verify will throw an error
        console.error('Error verifying token:', error.message);
        return null;
    }
}

module.exports = { generate_adm_jwt_token, verify_adm_jwt_token };