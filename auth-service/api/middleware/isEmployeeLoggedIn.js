const jwt = require("jsonwebtoken");
module.exports = (req, resp, next) => {
  try {
    const token = req.cookies.authToken;
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY); //stores the token and verifies if same
    req.userData = decoded; //created new field use thhis to check if admin or Not.
    if (decoded.isEmployee === true) {
      next();
    }
    //is a company
    else {
      return resp.json({
        Authenticated: true,
        isCompany: true,
        isEmployee: false,
        cid: decoded.cid,
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
