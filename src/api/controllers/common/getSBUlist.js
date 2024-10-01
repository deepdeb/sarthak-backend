const Joi = require('joi');
const getSBUlistService = require('../../services/getSBUlistService');
exports.getSBUlistController = async (req, res) => {
    try {
        const getSBUlistData = Joi.object({
            sbu_id: Joi.required()
        })
        const { error, value } = getSBUlistData.validate(req.body);
        if(error) {
            console.log(`Invalid get SBU list data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get SBU list data`);
        const resp = await getSBUlistService.getSBUlist(req.body);
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