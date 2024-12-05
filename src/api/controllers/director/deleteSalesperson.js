const Joi = require('joi');
const deleteSalespersonService = require('../../services/deleteSalespersonService');
exports.deleteSalespersonController = async (req, res) => {
    try {
        const deleteSalespersonData = Joi.object({
            sales_person_id: Joi.required()
        })
        const { error, value } = deleteSalespersonData.validate(req.body);
        if(error) {
            console.log(`Invalid delete salesperson data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid delete salesperson data`);
        const resp = await deleteSalespersonService.deleteSalesperson(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('delete salesperson controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}