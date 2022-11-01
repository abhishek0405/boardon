const axios = require("axios");
const authUrl = process.env.AUTH_SERVICE || "http://localhost:3002";
const isLoggedIn = async (req, res, next) => {
  try {
    const authToken = req.cookies.authToken;
    //console.log(authToken);
    const response = await axios.get(`${authUrl}/auth/user/isLoggedIn`, {
      headers: {
        Cookie: `authToken=${authToken};`,
      },
    });
    //console.log(response.data);
    const authStatus = response.data.Authenticated;
    const isEmployee = response.data.isEmployee;
    if (authStatus === true && isEmployee === true) {
      //fetching the userData object from auth service
      req.userData = response.data;
      next();
    } else {
      return res.json({
        message: "Unauthorized Access",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Unauthorized Access",
    });
  }
};

module.exports = isLoggedIn;
