const axios = require("axios");

const isLoggedIn = async (req, res, next) => {
  try {
    const authToken = req.cookies.authToken;
    const response = await axios.get(
      `http://localhost:3002/auth/user/isLoggedIn`,
      {
        headers: {
          Cookie: `authToken=${authToken};`,
        },
      }
    );

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
    return res.json(err);
  }
};

module.exports = {
  isLoggedIn,
};
