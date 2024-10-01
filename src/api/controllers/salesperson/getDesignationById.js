const Joi = require('joi');
const getDesignationByIdService = require('../../services/getDesignationByIdService')
exports.getDesignationByIdController = async (req, res) => {
    try {
        const getDesignationByIdData = Joi.object({
            designation_id: Joi.required()
        })
        const { error, value } = getDesignationByIdData.validate(req.body);
        if(error) {
            console.log(`Invalid get designation by ID data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get designation by ID data`);
        const resp = await getDesignationByIdService.getDesignationById(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp[0]});
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Get designation by ID controller Error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}