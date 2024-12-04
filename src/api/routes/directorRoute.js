const router = require('express').Router();
const { createSalespersonController, editSalespersonController } = require('../controllers/director/createSalesperson');
const { getSalespersonListController } = require('../controllers/director/getSalespersonList');
const { createSegmentController, editSegmentController } = require('../controllers/director/createSegment');
const { createSubSegmentController, editSubSegmentController } = require('../controllers/director/createSubSegment');
const { createSubSubSegmentController } = require('../controllers/director/createSubSubSegment');
const { createSubSubSubSegmentController } = require('../controllers/director/createSubSubSubSegment');
const { getMentorListController } = require('../controllers/director/getMentorList');
const { addNewCompanyController, editCompanyController } = require('../controllers/director/addNewCompany');
const { getCompanyByIdController } = require('../controllers/director/getCompanyById');
const { uploadCompanyDocumentController } = require('../controllers/director/uploadCompanyDocument');
const { getCompanyDocumentDetailsByIdController } = require('../controllers/director/getCompanyDocumentDetailsById');
module.exports = router;
router.post('/createSalesperson', createSalespersonController);
router.post('/editSalesperson', editSalespersonController)
router.post('/getSalespersonList', getSalespersonListController);
router.post('/createSegment', createSegmentController);
router.post('/createSubSegment', createSubSegmentController);
router.post('/createSubSubSegment', createSubSubSegmentController);
router.post('/createSubSubSubSegment', createSubSubSubSegmentController);
router.post('/editSegment', editSegmentController);
router.post('/editSubSegment', editSubSegmentController);
router.post('/getMentorList', getMentorListController);
router.post('/addNewCompany', addNewCompanyController);
router.post('/editCompany', editCompanyController);
router.post('/getCompanyById', getCompanyByIdController);
router.post('/uploadCompanyDocument', uploadCompanyDocumentController);
router.post('/getCompanyDocumentDetailsById', getCompanyDocumentDetailsByIdController)