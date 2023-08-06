module.exports = {
  secret: "tanasat-secret-key", // ต้องตรงกันกับ msu-auth (app-auth api กับ msu-auth api ต้อมี secret ตรงกันจึงจะสามารถ validate token ได้)
  jwtExpiration: 43200,           // 12 hour
  //jwtExpiration: 3600,           // 1 hour
  // jwtExpiration: 60,          // 1 minute
  jwtRefreshExpiration: 86400,   // 24 hours

  appSecret:"tanasat-secret-key" // auth api secret key for this app
  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};