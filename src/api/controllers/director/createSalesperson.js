const Joi = require('joi');
const createSalespersonService = require('../../services/createSalespersonService');
exports.createSalespersonController = async (req, res) => {
    try {
        const createSalespersonData = Joi.object({
            sbu_id: Joi.required(),
            function_id: Joi.required(),
            sales_person_name: Joi.required(),
            designation_id: Joi.required(),
            mobile: Joi.required(),
            email: Joi.required(),
            dob: Joi.required(),
            password: Joi.required(),
        })
        const { error, value } = createSalespersonData.validate(req.body);
        if(error) {
            console.log(`Invalid create salesperson data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid create salesperson data`);
        const resp = await createSalespersonService.createSalesperson(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}

exports.editSalespersonController = async (req, res) => {
    try {
        const editSalespersonData = Joi.object({
            sales_person_id: Joi.required(),
            sbu_id: Joi.required(),
            function_id: Joi.required(),
            sales_person_name: Joi.required(),
            designation_id: Joi.required(),
            mobile: Joi.required(),
            email: Joi.required(),
            dob: Joi.required(),
            password: Joi.required(),
        })
        const { error, value } = editSalespersonData.validate(req.body);
        if(error) {
            console.log(`Invalid edit salesperson data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid edit salesperson data`);
        const resp = await createSalespersonService.editSalesperson(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}