const Joi = require('joi');
const createFollowUpService = require('../../services/createFollowUpService');
exports.createFollowUpController = async (req, res) => {
    try {
        const createFollowUpData = Joi.object({
            enquiry_id: Joi.required(),
            status_date: Joi.required(),
            status: Joi.required(),
            remarks: Joi.required(),
            support: Joi.required()
        })
        const { error, value } = createFollowUpData.validate(req.body);
        if(error) {
            console.log(`Invalid create follow up data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid create follow up data`);
        const resp = await createFollowUpService.createFollowUp(req.body);
        if(resp) {
            return res.json({success: true, status: 200, response: resp});
        } else {
            return res.json({success: false, status: 500, response: []});
        }
    } catch (error) {
        console.log('Create follow up controller error: ', error);
        return
    }
}