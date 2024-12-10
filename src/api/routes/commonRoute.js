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
const { getEnquiryTypeListController } = require('../controllers/common/getEnquiryTypeList');
const { getEnquirySubTypeListController } = require('../controllers/common/getEnquirySubTypeList');
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
const { filterListByCategoryController } = require('../controllers/common/filterListByCategory');
const { getCustomersByFilterController } = require('../controllers/common/getCustomersByFilter');
const { createOrderController, editOrderController } = require('../controllers/common/createOrder');
const { getPOTypeListController } = require('../controllers/common/getPOTypeList');
const { getPOSubTypeListController } = require('../controllers/common/getPOSubTypeList');
const { getOrderListController } = require('../controllers/common/getOrderList');
const { fileuploadController } = require('../controllers/common/fileUpload');
const { getOrderByIdController } = require('../controllers/common/getOrderById');
const { filterEnquiryCategoryController } = require('../controllers/common/filterEnquiryCategory');
const { getEnquiriesByFilterController } = require('../controllers/common/getEnquiriesByFilter');
const { filterOrderCategoryController } = require('../controllers/common/filterOrderCategory');
const { getOrdersByFilterController } = require('../controllers/common/getOrdersByFilter');
const { multipleFileUploadController } = require('../controllers/common/multipleFileUpload');
const { enquiryReportController, enquiryReportSalespersonController } = require('../controllers/common/enquiryReport');
const { orderReportController, orderReportSalespersonController } = require('../controllers/common/orderReport');
const { getCustomerListForEnquiryOrderController } = require('../controllers/common/getCustomerListForEnquiryOrder');
const { getSalespersonListForEnquiryOrderController } = require('../controllers/common/getSalespersonListForEnquiryOrder');
const { getSegmentsByStateController } = require('../controllers/common/getSegmentsByState');
// const { deleteCustomerController } = require('../controllers/common/deleteCustomer');
// const { deleteEnquiryController } = require('../controllers/common/deleteEnquiry');
// const { deleteOrderController } = require('../controllers/common/deleteOrder');
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
router.get('/getEnquiryTypeList', getEnquiryTypeListController)
router.get('/getEnquirySubTypeList', getEnquirySubTypeListController)
router.post('/getEnquiryById', getEnquiryByIdController)
router.post('/createFollowUp', createFollowUpController)
router.post('/getFollowUpById', getFollowUpByIdController)
router.post('/filterListByCategory', filterListByCategoryController)
router.post('/getCustomersByFilter', getCustomersByFilterController)
router.post('/filterEnquiryCategory', filterEnquiryCategoryController)
router.post('/getEnquiriesByFilter', getEnquiriesByFilterController)
router.post('/createOrder', createOrderController)
router.get('/getPOTypeList', getPOTypeListController)
router.post('/getPOSubTypeList', getPOSubTypeListController)
router.post('/getOrderList', getOrderListController)
router.post('/fileUpload', fileuploadController)
router.post('/multipleFileUpload', multipleFileUploadController)
router.post('/getOrderById', getOrderByIdController)
router.post('/editOrder', editOrderController)
router.post('/filterOrderCategory', filterOrderCategoryController)
router.post('/getOrdersByFilter', getOrdersByFilterController)
router.post('/getEnquiryReport', enquiryReportController)
router.post('/getEnquiryReportSalesperson', enquiryReportSalespersonController)
router.post('/getOrderReport', orderReportController)
router.post('/getOrderReportSalesperson', orderReportSalespersonController)
router.post('/getCustomerListForEnquiryOrder', getCustomerListForEnquiryOrderController)
router.post('/getSalespersonListForEnquiryOrder', getSalespersonListForEnquiryOrderController)
// router.post('/deleteCustomer', deleteCustomerController)
// router.post('/deleteEnquiry', deleteEnquiryController)
// router.post('/deleteOrder', deleteOrderController)
router.post('/getSegmentsByState', getSegmentsByStateController)