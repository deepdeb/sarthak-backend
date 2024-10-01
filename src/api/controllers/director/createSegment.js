const Joi = require('joi');
const createSegmentService = require('../../services/createSegmentService');
exports.createSegmentController = async (req, res) => {
    try {
        const createSegmentData = Joi.object({
            segment_name: Joi.required()
        })
        const { error, value } = createSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid create segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') })
        }
        console.log(`Valid create segment data`);
        const resp = await createSegmentService.createSegment(req.body);
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

exports.editSegmentController = async (req, res) => {
    try {
        const editSegmentData = Joi.object({
            segment_id: Joi.required(),
            segment_name: Joi.required()
        })
        const { error, value } = editSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid edit segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') })
        }
        console.log(`Valid edit segment data`);
        const resp = await createSegmentService.editSegment(req.body);
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