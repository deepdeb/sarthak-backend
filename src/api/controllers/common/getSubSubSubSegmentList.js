const Joi = require('joi')
const getSubSubSubSegmentListService = require('../../services/getSubSubSubSegmentListService');
exports.getSubSubSubSegmentListController = async (req, res) => {
    try {
        const getSubSubSubSegmentListData = Joi.object({
            segment_id: Joi.required(),
            subsegment_id: Joi.required(),
            subsubsegment_id: Joi.required()
        })
        const { error, value } = getSubSubSubSegmentListData.validate(req.body);
        if(error) {
            console.log(`Invalid sub sub sub segment list data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid sub sub sub segment list data`);
        const resp = await getSubSubSubSegmentListService.getSubSubSubSegmentList(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp[0], total_count: resp[1]});
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Get sub sub sub segment list controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}