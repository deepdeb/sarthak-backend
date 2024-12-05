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