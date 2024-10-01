require('dotenv').config();
const app = require('./config/express');
const { port, env } = require('./config/vars');

// app.listen(port, '192.168.1.15', () => console.log(`server listening on port ${port} || 3000 (${env})`));
app.listen(port, () => console.log(`server listening on port ${port} || 3000 (${env})`));

module.exports = app;