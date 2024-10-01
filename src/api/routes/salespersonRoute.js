const router = require('express').Router();
const { getSalespersonByIdController } = require('../controllers/salesperson/getSalespersonById');
module.exports = router;
router.post('/getSalespersonById', getSalespersonByIdController)