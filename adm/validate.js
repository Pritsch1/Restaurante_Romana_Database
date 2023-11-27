/* ---Dependencies--- */
const validator = require('validator');
const zxcvbn = require('zxcvbn');

function validate_signin(front_data) {
    if (
        !front_data ||
        typeof front_data !== 'object' ||
        !front_data.hasOwnProperty('email') ||
        !front_data.hasOwnProperty('password') ||
        typeof front_data.email !== 'string' ||
        typeof front_data.password !== 'string' ||
        validator.isEmail(front_data.email) === false
    ) { return false; }
    return true;
}

/* Need to add an email verification and phone verification */

function validate_signup(front_data) {
    const result = zxcvbn(front_data.password);
    const score = result.score;
    if (
        !front_data ||
        typeof front_data !== 'object' ||
        !front_data.hasOwnProperty('email') ||
        !front_data.hasOwnProperty('password') ||
        !front_data.hasOwnProperty('phone') ||
        typeof front_data.email !== 'string' ||
        typeof front_data.password !== 'string' ||
        typeof front_data.phone !== 'string' ||
        validator.isEmail(front_data.email) === false ||
        score < 3
    ) { return false; }
    return true;
}

module.exports = { validate_signin, validate_signup };

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