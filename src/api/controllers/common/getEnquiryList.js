const Joi = require('joi');
const getEnquiryListService = require('../../services/getEnquiryListService');

exports.getEnquiryListController = async (req, res) => {
    try {
        const getEnquiryListData = Joi.object({
            sbu_id: Joi.required(),
            check_designation_id: Joi.required(),
            sales_person_id: Joi.required()
        })
        const { error, value } = getEnquiryListData.validate(req.body);
        if(error) {
            console.log(`Invalid get enquiry list data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get enquiry list data`);
        const resp = await getEnquiryListService.getEnquiryList(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: '', response: resp[0], total_count: resp[1]})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('get enquiry list controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}