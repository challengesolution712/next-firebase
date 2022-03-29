require('dotenv').config();

export const config = {
    apiKey: process.env.FAPI_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.P_ID,
    storageBucket: process.env.S_BUCKET,
    messagingSenderId: process.env.MS_SENDERID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEAS_ID
}
