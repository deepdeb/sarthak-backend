const Joi = require('joi');
const getEnquiriesByFilterService = require('../../services/getEnquiriesByFilterService');
exports.getEnquiriesByFilterController = async (req, res) => {
    try {
        const getEnquiriesByFilterData = Joi.object({
            filter_by: Joi.required(),
            filter_by_value: Joi.required()
        })
        const { error, value } = getEnquiriesByFilterData.validate(req.body);
        if(error) {
            console.log(`Invalid get enquiries by filter data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get enquiries by filter data`);
        const resp = await getEnquiriesByFilterService.getEnquiriesByFilter(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: '', response: resp[0], total_count: resp[1]})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Get enquiries by filter controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}