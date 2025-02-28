require('dotenv').config();
const app = require('./config/express');
const { port, env } = require('./config/vars');
const fs = require("fs");
const https = require("https");

const options = {
    key: fs.readFileSync("/var/webuzo/users/sarthakcrm/ssl/sarthakcomponents.com.key"),  // Path to your private key
    cert: fs.readFileSync("/var/webuzo/users/sarthakcrm/ssl/sarthakcomponents.com-combined.pem") // Path to your certificate
};

// https.createServer(options, app).listen(port);
app.listen(port, () => console.log(`server listening on port ${port} || 3000 (${env})`));

module.exports = app;