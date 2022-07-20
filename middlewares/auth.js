const jwt = require("jsonwebtoken");
const cook = require("cookie-parser");

exports.auth = function (req, res, next) {
  console.log(req.cook);
  // let token = req.cook.jwt;
  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    console.log(decoded.user);
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
