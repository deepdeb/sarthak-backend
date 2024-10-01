const Joi = require('joi');
const getSubSubSegmentListService = require('../../services/getSubSubSegmentListService')
exports.getSubSubSegmentListController = async (req, res) => {
    try {
        const getSubSubSegmentListData = Joi.object({
            segment_id: Joi.required(),
            subsegment_id: Joi.required()
        })
        const { error, value } = getSubSubSegmentListData.validate(req.body);
        if(error) {
            console.log(`Invalid sub sub segment list data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid sub sub segment list data`);
        const resp = await getSubSubSegmentListService.getSubSubSegmentList(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp[0], total_count: resp[1]});
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}