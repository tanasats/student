const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    console.log("verifyToken decode:",decoded) 
    req.user_id = decoded.user_id;
    req.user_type = decoded.user_type;
    req.user_faculty_id = decoded.faculty_id;
    req.user_faculty_name = decoded.faculty_name;
    next();
  });
}; 

const authJwt = {
  verifyToken: verifyToken
}
module.exports = authJwt;