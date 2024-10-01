const router = require('express').Router();
const { createNewSBUController } = require('../controllers/director/createNewSBU');
const { createSalespersonController, editSalespersonController } = require('../controllers/director/createSalesperson');
const { getSalespersonListController } = require('../controllers/director/getSalespersonList');
const { createSegmentController, editSegmentController } = require('../controllers/director/createSegment');
const { createSubSegmentController, editSubSegmentController } = require('../controllers/director/createSubSegment');
const { createSubSubSegmentController } = require('../controllers/director/createSubSubSegment');
module.exports = router;
router.post('/createSalesperson', createSalespersonController);
router.post('/editSalesperson', editSalespersonController)
router.post('/getSalespersonList', getSalespersonListController);
router.post('/createNewSBU', createNewSBUController);
router.post('/createSegment', createSegmentController);
router.post('/createSubSegment', createSubSegmentController);
router.post('/createSubSubSegment', createSubSubSegmentController);
router.post('/editSegment', editSegmentController);
router.post('/editSubSegment', editSubSegmentController);