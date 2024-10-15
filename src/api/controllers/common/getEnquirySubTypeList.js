const Joi = require('joi');
const getEnquirySubTypeListService = require('../../services/getEnquirySubTypeListService');
exports.getEnquirySubTypeListController = async (req, res) => {
    try {
        const resp = await getEnquirySubTypeListService.getEnquirySubTypeList(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Enquiry sub type list controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}