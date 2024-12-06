const Joi = require('joi');
const deleteOrderService = require('../../services/deleteOrderService');
exports.deleteOrderController = async (req, res) => {
    try {
        const deleteOrderData = Joi.object({
            order_id: Joi.required()
        })
        const { error, value } = deleteOrderData.validate(req.body);
        if(error) {
            console.log(`Invalid delete order data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid delete order data`);
        const resp = await deleteOrderService.deleteOrder(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('delete order controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}