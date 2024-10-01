const Joi = require('joi');
const getSubSegmentListService = require('../../services/getSubSegmentListService')
exports.getSubSegmentListController = async (req, res) => {
    try {
        const getSubSegmentListData = Joi.object({
            segment_id: Joi.required()
        })
        const { error, value } = getSubSegmentListData.validate(req.body);
        if(error) {
            console.log(`Invalid sub segment list data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid sub segment list data`);
        const resp = await getSubSegmentListService.getSubSegmentList(req.body);
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