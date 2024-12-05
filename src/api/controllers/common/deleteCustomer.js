const Joi = require('joi');
const deleteCustomerService = require('../../services/deleteCustomerService');
exports.deleteCustomerController = async (req, res) => {
    try {
        const deleteCustomerData = Joi.object({
            customer_id: Joi.required()
        })
        const { error, value } = deleteCustomerData.validate(req.body);
        if(error) {
            console.log(`Invalid delete customer data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid delete customer data`);
        const resp = await deleteCustomerService.deleteCustomer(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('delete customer controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}