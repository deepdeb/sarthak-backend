const Joi = require('joi');
const deleteEnquiryService = require('../../services/deleteEnquiryService');
exports.deleteEnquiryController = async (req, res) => {
    try {
        const deleteEnquiryData = Joi.object({
            enquiry_id: Joi.required()
        })
        const { error, value } = deleteEnquiryData.validate(req.body);
        if(error) {
            console.log(`Invalid delete customer data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid delete enquiry data`);
        const resp = await deleteEnquiryService.deleteEnquiry(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('delete enquiry controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}