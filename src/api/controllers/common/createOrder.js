const Joi = require('joi');
const createOrderService = require('../../services/createOrderService');
exports.createOrderController = async (req, res) => {
    try {
        const createOrderData = Joi.object({
            sales_person_id: Joi.required(),
            sbu_id: Joi.required(),
            customer_id: Joi.required(),
            po_number: Joi.required(),
            po_date: Joi.required(),
            po_type_id: Joi.required(),
            po_subtype_id: Joi.required(),
            basic_po_value: Joi.required(),
            total_po_value: Joi.required(),
            scheduled_completion_date: Joi.required(),
            actual_completion_date: Joi.required(),
            purchase_order_file: Joi.optional(),
            completion_file: Joi.optional(),
            credential_file: Joi.optional()
        })
        const { error, value } = createOrderData.validate(req.body);
        if(error) {
            console.log(`Invalid create order data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid create order data`);
        const resp = await createOrderService.createOrder(req.body);
        if(resp) {
            return res.json({success: true, status: 200, response: resp});
        } else {
            return res.json({success: false, status: 500, response: []});
        }
    } catch (error) {
        console.log('Create order controller error: ', error);
        return
    }
}