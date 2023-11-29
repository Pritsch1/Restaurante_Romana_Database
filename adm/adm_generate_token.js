/* ---envs--- */
const JWT_ADM_KEY = process.env.RRJWT_ADM_KEY;
/* ---Dependencies--- */
const jwt = require('jsonwebtoken');

function generate_adm_jwt_token(user_data) {
    const user = {
        email: user_data.email,
        role: "admin"
    }
    const token = jwt.sign(user, JWT_ADM_KEY, { expiresIn: '5min' });

    return token;
}

module.exports = { generate_adm_jwt_token };