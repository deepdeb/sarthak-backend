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
            product: Joi.optional(),
            description: Joi.optional(),
            brand: Joi.optional(),
            cable_assembly: Joi.optional(),
            panel: Joi.optional(),
            welding_receptable: Joi.optional(),
            clamps: Joi.optional(),
            hsa_box: Joi.optional(),
            others: Joi.optional(),
            basic_po_value: Joi.required(),
            total_po_value: Joi.required(),
            scheduled_completion_date: Joi.required(),
            actual_completion_date: Joi.optional(),
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
            return res.json({success: true, status: 200, response: resp, message: resp});
        } else {
            return res.json({success: false, status: 500, response: []});
        }
    } catch (error) {
        console.log('Create order controller error: ', error);
        return
    }
}

exports.editOrderController = async (req, res) => {
    try {
        const editOrderData = Joi.object({
            order_id: Joi.required(),
            sales_person_id: Joi.required(),
            sbu_id: Joi.required(),
            customer_id: Joi.required(),
            po_number: Joi.required(),
            po_date: Joi.required(),
            po_type_id: Joi.required(),
            product: Joi.optional(),
            description: Joi.optional(),
            brand: Joi.optional(),
            cable_assembly: Joi.optional(),
            panel: Joi.optional(),
            welding_receptable: Joi.optional(),
            clamps: Joi.optional(),
            hsa_box: Joi.optional(),
            others: Joi.optional(),
            basic_po_value: Joi.required(),
            total_po_value: Joi.required(),
            scheduled_completion_date: Joi.required(),
            actual_completion_date: Joi.optional(),
            purchase_order_file: Joi.optional(),
            completion_file: Joi.optional(),
            credential_file: Joi.optional()
        })
        const { error, value } = editOrderData.validate(req.body);
        if(error) {
            console.log(`Invalid edit order data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid edit order data`);
        const resp = await createOrderService.editOrder(req.body);
        if(resp) {
            return res.json({success: true, status: 200, response: resp, message: resp});
        } else {
            return res.json({success: false, status: 500, response: []});
        }
    } catch (error) {
        console.log('Edit order controller error: ', error);
        return
    }
}