const Joi = require('joi');
const getSalespersonListForEnquiryOrderService = require('../../services/getSalespersonListForEnquiryOrderService');
exports.getSalespersonListForEnquiryOrderController = async (req, res) => {
    try {
        const getSalespersonListforEnquiryOrderData = Joi.object({
            sbu_id: Joi.required(),
            sales_person_id: Joi.required(),
            report_navigation_type: Joi.required()
        })
        const {error, value} = getSalespersonListforEnquiryOrderData.validate(req.body);
        if(error) {
            console.log(`Invalid salesperson list for enquiry order data:  ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid salesperson list for enquiry order data`);
        const resp = await getSalespersonListForEnquiryOrderService.getSalespersonListForEnquiryOrder(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('get salesperson list for enquiry order controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}