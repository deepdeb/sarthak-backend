const router = require('express').Router();
const { getDesignationByIdController } = require('../controllers/salesperson/getDesignationById');
const { getSalespersonByIdController } = require('../controllers/salesperson/getSalespersonById');
module.exports = router;
router.post('/getSalespersonById', getSalespersonByIdController)
router.post('/getDesignationById', getDesignationByIdController)