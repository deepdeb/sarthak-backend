const Joi = require('joi');
const getOrdersByFilterService = require('../../services/getOrdersByFilterService')
exports.getOrdersByFilterController = async (req, res) => {
    try {
        const getOrdersByFilterData = Joi.object({
            filter_by: Joi.required(),
            filter_by_value: Joi.required(),
            sales_person_id: Joi.required(),
            sbu_id: Joi.required()
        })
        const { error, value } = getOrdersByFilterData.validate(req.body);
        if(error) {
            console.log(`Invalid get Orders by filter data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get Orders by filter data`);
        const resp = await getOrdersByFilterService.getOrdersByFilter(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: '', response: resp[0], total_count: resp[1]})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Get Orders by filter controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}