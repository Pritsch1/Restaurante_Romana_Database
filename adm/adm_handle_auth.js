/* ---My Files--- */
const { query_database } = require('../database');
const { validate_signin, validate_signup } = require('./adm_validate');
function handle_adm_signin(data) {
    return new Promise((resolve, reject) => {
        //console.log("handle: ", data);
        if (validate_signin(data) === true) {
            const query = 'SELECT * FROM adm_login WHERE email = ? AND password = ?';
            query_database(query, [data.email, data.password])
                .then((a) => {
                    resolve(a[0]);
                });
        } else {
            reject("Missing Signin Data @ RRDAHA");
        }
    });
}

function handle_adm_signup(data) {
    /*
    const result = zxcvbn(data.password);
    const score = result.score;
    score < 3
    */

    return new Promise((resolve, reject) => {
        //console.log("handle: ", data);
        if (validate_signup(data) === true) {
            const query = 'INSERT INTO adm_login (email, password) VALUES (?, ?)';
            query_database(query, [data.email, data.password])
                .then((a) => {
                    resolve(a[0]);
                });
        } else {
            reject("Missing Signin Data @ RRDAHA");
        }
    });
}

module.exports = { handle_adm_signin, handle_adm_signup };

/* Need to add an email verification and phone verification */

/*const ip = req.body.location.ipString;
if (ip) {
await fetch(`https://api-bdc.net/data/ip-geolocation-full?ip=${ip}&localityLanguage=pt&key=${BCDKEY}`)
.then((response) => response.json()
    .then(data => {
        //console.log(data);  // SELECT DATA @ DELETE_ME JSON
        let selected_data = {
            connection_from: {
                geolocatable: data.isReachableGlobally,
                ipString: data.ip,
                country_short: data.country.isoAlpha2,
                country: data.country.isoName,
                state: data.location.principalSubdivision,
                state_iso: data.location.isoPrincipalSubdivision,
                continentCode: data.location.continentCode,
                city: data.location.city,
                latitude: data.location.latitude,
                longitude: data.location.longitude,
            },
            network_used: {
                registry: data.network.registry,
                registeredCountry: data.network.registeredCountry,
                registeredCountryName: data.network.registeredCountryName,
                organisation: data.network.organisation,
                isReachableGlobally: data.network.isReachableGlobally,
                isBogon: data.network.isBogon,
            },
            time_data: {
                uts_s: data.location.timeZone.utcOffsetSeconds,
                utc: data.location.timeZone.utcOffset,
                isDaylightSavingTime: data.location.timeZone.isDaylightSavingTime,
                localTime: data.location.timeZone.localTime,
            },
            security_threat: {
                securityThreat: data.securityThreat,
                isKnownAsTorServer: data.hazardReport.isKnownAsTorServer,
                isKnownAsVpn: data.hazardReport.isKnownAsVpn,
                isKnownAsProxy: data.hazardReport.isKnownAsProxy,
                isSpamhausDrop: data.hazardReport.isSpamhausDrop,
                isSpamhausEdrop: data.hazardReport.isSpamhausEdrop,
                isSpamhausAsnDrop: data.hazardReport.isSpamhausAsnDrop,
                isBlacklistedUceprotect: data.hazardReport.isBlacklistedUceprotect,
                isBlacklistedBlocklistDe: data.hazardReport.isBlacklistedBlocklistDe,
                isKnownAsMailServer: data.hazardReport.isKnownAsMailServer,
                isKnownAsPublicRouter: data.hazardReport.isKnownAsPublicRouter,
                isBogon: data.hazardReport.isBogon,
                isUnreachable: data.hazardReport.isUnreachable,
                hostingLikelihood: data.hazardReport.hostingLikelihood,
                isHostingAsn: data.hazardReport.isHostingAsn,
                isCellular: data.hazardReport.isCellular,
                iCloudPrivateRelay: data.hazardReport.iCloudPrivateRelay
            },
            language_requested: data.localityLanguageRequested,
            lastUpdated: data.lastUpdated,
        }
        console.log(selected_data);
        device_info = data;
    }))
.catch((error) => { device_info = "ip-geolocation not working!" });
} else {
device_info = "No ip received!"
}*/