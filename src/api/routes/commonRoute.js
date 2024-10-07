const router = require('express').Router();
const { createCustomerController, editCustomerController } = require('../controllers/common/createCustomer');
const { createEnquiryController, editEnquiryController } = require('../controllers/common/createEnquiry');
const { createFollowUpController } = require('../controllers/common/createFollowUp');
const { getCustomerDetailsByIdController } = require('../controllers/common/getCustomerDetailsById');
const { getCustomerListController } = require('../controllers/common/getCustomerList');
const { getCustomerListBySalespersonController } = require('../controllers/common/getCustomerListBySalesperson');
const { getDashboardCountController } = require('../controllers/common/getDashboardCount');
const { getDesignationListController } = require('../controllers/common/getDesignationList');
const { getEnquiryByIdController } = require('../controllers/common/getEnquiryById');
const { getEnquiryListController } = require('../controllers/common/getEnquiryList');
const { getEnquirySourceListController } = require('../controllers/common/getEnquirySourceList');
const { getFollowUpByIdController } = require('../controllers/common/getFollowUpById');
const { getFunctionListController } = require('../controllers/common/getFunctionList');
const { getProductCategoryListController } = require('../controllers/common/getProductCategoryList');
const { getSBUlistController } = require('../controllers/common/getSBUlist');
const { getSegmentListController } = require('../controllers/common/getSegmentList');
const { getStateListController } = require('../controllers/common/getStateList');
const { getSubSegmentListController } = require('../controllers/common/getSubSegmentList');
const { getSubSubSegmentListController } = require('../controllers/common/getSubSubSegmentList');
const { getSubSubSubSegmentListController } = require('../controllers/common/getSubSubSubSegmentList');
const { loginController } = require('../controllers/common/login');
module.exports = router;
router.post('/getDashboardCount', getDashboardCountController)
router.post('/getCustomerList', getCustomerListController)
router.post('/getCustomerListBySalesperson', getCustomerListBySalespersonController)
router.post('/getCustomerDetailsById', getCustomerDetailsByIdController)
router.post('/createCustomer', createCustomerController)
router.post('/editCustomer', editCustomerController)
router.post('/getSBUlist', getSBUlistController)
router.post('/login', loginController)
router.get('/getSegmentList', getSegmentListController)
router.post('/getSubSegmentList', getSubSegmentListController)
router.post('/getSubSubSegmentList', getSubSubSegmentListController)
router.post('/getSubSubSubSegmentList', getSubSubSubSegmentListController)
router.get('/getStateList', getStateListController)
router.get('/getProductCategoryList', getProductCategoryListController)
router.get('/getFunctionList', getFunctionListController)
router.get('/getDesignationList', getDesignationListController)
router.post('/createEnquiry', createEnquiryController)
router.post('/editEnquiry', editEnquiryController)
router.post('/getEnquiryList', getEnquiryListController)
router.get('/getEnquirySourceList', getEnquirySourceListController)
router.post('/getEnquiryById', getEnquiryByIdController)
router.post('/createFollowUp', createFollowUpController)
router.post('/getFollowUpById', getFollowUpByIdController)