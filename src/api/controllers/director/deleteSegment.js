const Joi = require('joi');
const deleteSegmentService = require('../../services/deleteSegmentService');

exports.deleteSubSubSubSegmentController = async (req, res) => {
    try {
        const deleteSubSubSubSegmentData = Joi.object({
            subsubsubsegment_id: Joi.required()
        })
        const { error, value } = deleteSubSubSubSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid delete sub sub sub segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid delete sub sub sub segment data`);
        const resp = await deleteSegmentService.deleteSubSubSubSegment(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('delete sub sub sub segment controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}

exports.deleteSubSubSegmentController = async (req, res) => {
    try {
        const deleteSubSubSegmentData = Joi.object({
            subsubsegment_id: Joi.required()
        })
        const { error, value } = deleteSubSubSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid delete sub sub segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid delete sub sub segment data`);
        const resp = await deleteSegmentService.deleteSubSubSegment(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('delete sub sub segment controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}

exports.deleteSubSegmentController = async (req, res) => {
    try {
        const deleteSubSegmentData = Joi.object({
            subsegment_id: Joi.required()
        })
        const { error, value } = deleteSubSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid delete sub segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid delete sub segment data`);
        const resp = await deleteSegmentService.deleteSubSegment(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('delete sub segment controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}

exports.deleteSegmentController = async (req, res) => {
    try {
        const deleteSegmentData = Joi.object({
            segment_id: Joi.required()
        })
        const { error, value } = deleteSegmentData.validate(req.body);
        if(error) {
            console.log(`Invalid delete segment data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid delete segment data`);
        const resp = await deleteSegmentService.deleteSegment(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('delete segment controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}