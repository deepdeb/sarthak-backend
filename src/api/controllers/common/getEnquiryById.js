const Joi = require('joi');
const getEnquiryByIdService = require('../../services/getEnquiryByIdService');

exports.getEnquiryByIdController = async (req, res) => {
    try {
        const getEnquiryByIdData = Joi.object({
            sbu_id: Joi.optional(),
            enquiry_id: Joi.required()
        })
        const { error, value } = getEnquiryByIdData.validate(req.body);
        if(error) {
            console.log(`Invalid get enquiry by ID data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get enquiry by ID data`);
        const resp = await getEnquiryByIdService.getEnquiryById(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: '', response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('get enquiry by ID controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}