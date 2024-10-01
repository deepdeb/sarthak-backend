const Joi = require('joi');
const getSalespersonByIdService = require('../../services/getSalespersonByIdService')
exports.getSalespersonByIdController = async (req, res) => {
    try {
        const getSalespersonByIdData = Joi.object({
        sales_person_id: Joi.required()
    })
    const { error, value } = getSalespersonByIdData.validate(req.body);
    if(error) {
        console.log(`Invalid sales person by ID data: ${error.details[0].message}`);
        return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
    }
    console.log(`Valid sales person by ID data`);
        const resp = await getSalespersonByIdService.getSalespersonById(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, message: '', response: resp[0] })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}