const jwt = require("jsonwebtoken");
module.exports = (req, resp, next) => {
  try {
    const token = req.cookies.authToken;
    const decoded = jwt.verify(token, process.env.JWT_KEY); //stores the token and verifies if same
    req.userData = decoded; //created new field use thhis to check if admin or Not.
    if (decoded.isCompany === true) {
      next();
    } else {
      return resp.json({
        Authenticated: true,
        isCompany: false,
        isEmployee: true,
        eid: decoded.eid,
        name: decoded.name,
      });
    }
  } catch (error) {
    console.log(error);
    return resp.json({
      Authenticated: false,
      isCompany: false,
      isEmployee: false,
    });
  }
};
