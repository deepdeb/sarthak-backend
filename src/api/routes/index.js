const router = require('express').Router();
const directorRoute = require('./directorRoute');
const commonRoute = require('./commonRoute');
const salespersonRoute = require('./salespersonRoute');
module.exports = router;
router.use('/director', directorRoute);
router.use('/common', commonRoute);
router.use('/salesperson', salespersonRoute);
