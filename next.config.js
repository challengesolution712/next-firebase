module.exports = {
  env: {
    API_KEY: process.env.API_KEY,
    FAPI_KEY: process.env.FAPI_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    P_ID: process.env.P_ID,
    S_BUCKET: process.env.S_BUCKET,
    MS_SENDERID: process.env.MS_SENDERID,
    APP_ID: process.env.APP_ID,
    MEAS_ID: process.env.MEAS_ID,
    URL: process.env.URL,
    SECRET: process.env.SECRET || "Token For Localhost hacking",
    EXP: 3,
    EMAIL: process.env.EMAIL
  },
}