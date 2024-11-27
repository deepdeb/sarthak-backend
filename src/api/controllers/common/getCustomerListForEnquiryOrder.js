const Joi = require('joi');
const getCustomerListForEnquiryOrderService = require('../../services/getCustomerListForEnquiryOrderService');
exports.getCustomerListForEnquiryOrderController = async (req, res) => {
    try {
        const getCustomerListforEnquiryOrderData = Joi.object({
            sbu_id: Joi.required(),
            sales_person_id: Joi.required(),
            check_designation_id: Joi.optional(),
            report_navigation_type: Joi.required()
        })
        const {error, value} = getCustomerListforEnquiryOrderData.validate(req.body);
        if(error) {
            console.log(`Invalid customer list for enquiry order data:  ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid customer list for enquiry order data`);
        const resp = await getCustomerListForEnquiryOrderService.getCustomerListForEnquiryOrder(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('get customer list for enquiry order controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}