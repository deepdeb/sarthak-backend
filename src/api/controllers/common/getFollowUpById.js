const Joi = require('joi');
const getFollowUpByIdService = require('../../services/getFollowUpByIdService');
exports.getFollowUpByIdController = async (req, res) => {
    try {
        const getFollowUpByIdData = Joi.object({
            enquiry_id: Joi.required()
        })
        const {error, value} = getFollowUpByIdData.validate(req.body);
        if(error) {
            console.log(`Invalid get follow up by ID data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get follow up by ID data`);
        const resp = await getFollowUpByIdService.getFollowUpById(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: '', response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('get follow up ID controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}