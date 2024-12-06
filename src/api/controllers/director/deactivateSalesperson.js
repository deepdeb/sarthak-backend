const Joi = require('joi');
const deactivateSalespersonService = require('../../services/deactivateSalespersonService');
exports.deactiveSalespersonController = async (req, res) => {
    try {
        const deactivateSalespersonData = Joi.object({
            sales_person_id: Joi.required()
        })
        const { error, value } = deactivateSalespersonData.validate(req.body);
        if(error) {
            console.log(`Invalid deactivate salesperson data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid deactivate salesperson data`);
        const resp = await deactivateSalespersonService.deactivateSalesperson(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('deactivate salesperson controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}