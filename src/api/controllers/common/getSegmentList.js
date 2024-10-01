const Joi = require('joi');
const getSegmentListService = require('../../services/getSegmentListService')
exports.getSegmentListController = async (req, res) => {
    try {
        const resp = await getSegmentListService.getSegmentList(req.body);
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