const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
const credRoutes = require("./api/routes/credRoutes");

app.use("/cred", credRoutes);

// app.use(
//   auth({
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     idpLogout: true,
//   })
// );

// app.get("/", (req, res) => {
//   if (req.oidc.isAuthenticated()) {
//     res.send("Authenticated");
//   } else {
//     res.send("Not authenticated");
//   }
// });
// app.get("/profile", requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

module.exports = app;
