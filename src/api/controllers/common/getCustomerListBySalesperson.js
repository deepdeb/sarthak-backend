const Joi = require('joi');
const getCustomerListBySalespersonService = require('../../services/getCustomerListBySalespersonService');
exports.getCustomerListBySalespersonController = async (req, res) => {
    try {
        const getCustomerListBySalespersonData = Joi.object({
            sales_person_id: Joi.required()
        })
        const {error, value} = getCustomerListBySalespersonData.validate(req.body);
        if(error) {
            console.log(`Invalid customer list by salesperson data:  ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid customer list by salesperson data`);
        const resp = await getCustomerListBySalespersonService.getCustomerListBySalesperson(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}