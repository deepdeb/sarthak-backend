const Joi = require('joi');
const createSubSegmentService = require('../../services/createSubSegmentService');
exports.createSubSegmentController = async (req, res) => {
    try {
        const createSubSegmentData = Joi.object({
            segment_id: Joi.required(),
            subsegment_name: Joi.required()
        })
        const { error, value } = createSubSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid create sub segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') })
        }
        console.log(`Valid create sub segment data`);
        const resp = await createSubSegmentService.createSubSegment(req.body);
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

exports.editSubSegmentController = async (req, res) => {
    try {
        const editSubSegmentData = Joi.object({
            segment_id: Joi.required(),
            subsegment_id: Joi.required(),
            subsegment_name: Joi.required()
        })
        const { error, value} = editSubSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid edit sub segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') })
        }
        console.log(`Valid edit sub segment data`);
        const resp = await createSubSegmentService.editSubSegment(req.body);
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