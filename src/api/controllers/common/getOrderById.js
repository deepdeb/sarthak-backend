const Joi = require('joi');
const getOrderByIdService = require('../../services/getOrderByIdService');
exports.getOrderByIdController = async (req, res) => {
    try {
        const getOrderByIdData = Joi.object({
            order_id: Joi.required()
        })
        const { error, value } = getOrderByIdData.validate(req.body);
        if(error) {
            console.log(`Invalid get order by id data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get order by id data`);
        const resp = await getOrderByIdService.getOrderById(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: '', response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('get order by id error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}