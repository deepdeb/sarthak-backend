const Joi = require('joi');
const getCustomerDetailsByIdService = require('../../services/getCustomerDetailsByIdService');
exports.getCustomerDetailsByIdController = async (req, res) => {
    try {
        const getCustomerDetailsByIdData = Joi.object({
        customer_id: Joi.required()
    })
    const { error, value } = getCustomerDetailsByIdData.validate(req.body);
    if(error) {
        console.log(`Invalid customer details by ID data: ${error.details[0].message}`);
        return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
    }
    console.log(`Valid customer details by ID data`);
        const resp = await getCustomerDetailsByIdService.getCustomerDetailsById(req.body);
        if(resp) {
            console.log(resp);
            return res.json({ success: true, status: 200, message: '', response: resp[0] })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}