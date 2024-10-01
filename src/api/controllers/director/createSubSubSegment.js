const Joi = require('joi');
const createSubSubSegmentService = require('../../services/createSubSubSegmentService');
exports.createSubSubSegmentController = async (req, res) => {
    try {
        const createSubSubSegmentData = Joi.object({
            segment_id: Joi.required(),
            subsegment_id: Joi.required(),
            subsubsegment_name: Joi.required()
        })
        const { error, value } = createSubSubSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid create sub sub segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') })
        }
        console.log(`Valid create sub sub segment data`);
        const resp = await createSubSubSegmentService.createSubSubSegment(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Error: ', error)
        return res.json({ success: false, status: 400, message: error.message, response: []})
    }
}