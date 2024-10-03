const Joi = require('joi')
const createSubSubSubSegmentService = require('../../services/createSubSubSubSegmentService');
exports.createSubSubSubSegmentController = async (req, res) => {
    try {
        const createSubSubSubSegmentData = Joi.object({
            segment_id: Joi.required(),
            subsegment_id: Joi.required(),
            subsubsegment_id: Joi.required(),
            subsubsubsegment_name: Joi.required()
        })
        const { error, value } = createSubSubSubSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid create sub sub sub segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') })
        }
        console.log(`Valid create sub sub sub segment data`);
        const resp = await createSubSubSubSegmentService.createSubSubSubSegment(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('create sub sub sub segment controller error: ', error);
        return res.json({ success: false, status: 400, message: error.message, response: []})
    }
}