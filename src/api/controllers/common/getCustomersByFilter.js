const Joi = require('joi');
const getCustomersByFilterService = require('../../services/getCustomersByFilterService')
exports.getCustomersByFilterController = async (req, res) => {
    try {
        const getCustomersByFilterData = Joi.object({
            filter_by: Joi.required(),
            filter_by_value: Joi.required()
        })
        const { error, value } = getCustomersByFilterData.validate(req.body);
        if(error) {
            console.log(`Invalid get customers by filter data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get customers by filter data`);
        const resp = await getCustomersByFilterService.getCustomersByFilter(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: '', response: resp[0], total_count: resp[1]})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Get customers by filter controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}