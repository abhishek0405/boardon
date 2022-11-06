const axios = require("axios");
const authUrl = process.env.AUTH_SERVICE || "http://localhost:3002";
const isLoggedIn = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    console.log(authToken);
    const response = await axios.get(`${authUrl}/auth/user/isLoggedIn`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("test");
    console.log(response.data);
    //will be true if either employee or company
    const authStatus = response.data.Authenticated;
    if (authStatus === true) {
      //fetching the userData object from auth service
      req.userData = response.data;
      next();
    } else {
      return res.json({
        message: "Unauthorized Access",
      });
    }
  } catch (err) {
    return res.json({
      message: "Unauthorized Access",
    });
  }
};

module.exports = isLoggedIn;
