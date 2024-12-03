const Joi = require('joi');
const addNewCompanyService = require('../../services/addNewCompanyService');
exports.addNewCompanyController = async (req, res) => {
    try {
        const addNewCompanyData = Joi.object({
            sbu_name : Joi.required(),
            contact_person : Joi.required(),
            contact_number : Joi.required(),
            email: Joi.required(),
            address: Joi.required(),
            city: Joi.required(),
            state_id: Joi.required(),
            pin: Joi.required(),
        })
        const { error, value } = addNewCompanyData.validate(req.body);
        if(error) {
            console.log(`Invalid add new company data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid add new company data`);
        const resp = await addNewCompanyService.addNewCompany(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('add new company controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}