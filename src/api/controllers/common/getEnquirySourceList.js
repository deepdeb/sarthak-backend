const Joi = require('joi');
const getEnquirySourceListService = require('../../services/getEnquirySourceListService');
exports.getEnquirySourceListController = async (req, res) => {
    try {
        const resp = await getEnquirySourceListService.getEnquirySourceList(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}