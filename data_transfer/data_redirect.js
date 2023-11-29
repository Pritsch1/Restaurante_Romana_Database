/* ---My Files--- */
const { handle_adm_signin, handle_adm_signup } = require('.././adm/adm_handle_auth');

function data_redirect(unpacked_data) {
    switch (unpacked_data.type) {
        case 'adm_signin':
            return handle_adm_signin(unpacked_data.decrypted_data);
        case 'adm_signup':
            return handle_adm_signup(unpacked_data.decrypted_data);
        default:
            return Promise.reject("Unable To Redirect Data @ RRDDR");
    }
}

module.exports = { data_redirect };