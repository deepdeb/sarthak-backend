const writePool = require('../../config/mysql').writePool;
exports.createOrder = async (data) => {
    try {
        let insert_order_sql = "INSERT INTO orders(sales_person_id, sbu_id, customer_id, po_number, po_date, po_type_id, product, description, brand, cable_assembly, panel, welding_receptable, clamps, hsa_box, others, basic_po_value, total_po_value, scheduled_completion_date, actual_completion_date, purchase_order_file, completion_file, credential_file) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        const [resp] = await writePool.query(insert_order_sql, [data.sales_person_id, data.sbu_id, data.customer_id, data.po_number, data.po_date, data.po_type_id, data.product, data.description, data.brand, data.cable_assembly, data.panel, data.welding_receptable, data.clamps, data.hsa_box, data.others, data.basic_po_value, data.total_po_value, data.scheduled_completion_date, data.actual_completion_date, data.purchase_order_file, data.completion_file, data.credential_file]);
        if(resp) {
            return 'Order created successfully'
        }
    } catch (error) {
        console.log('Create order service error:', error);
        return;
    }
}

exports.editOrder = async (data) => {
    try {
        let edit_order_sql = "UPDATE order SET sales_person_id = ?, sbu_id = ?, customer_id = ?, po_number = ?, po_date = ?, po_type_id = ?, product = ?, description = ?, brand = ?, cable_assembly = ?, panel = ?, welding_receptable = ?, clamps = ?, hsa_box = ?, others = ?, basic_po_value = ?, total_po_value = ?, scheduled_completion_date = ?, actual_completion_date = ?, purchase_order_file = ?, completion_file = ?, credential_file = ? WHERE order_id = ?"
        const [resp] = await writePool.query(edit_order_sql, [data.sales_person_id, data.sbu_id, data.customer_id, data.po_number, data.po_date, data.po_type_id, data.product, data.description, data.brand, data.cable_assembly, data.panel, data.welding_receptable, data.clamps, data.hsa_box, data.others, data.basic_po_value, data.total_po_value, data.scheduled_completion_date, data.actual_completion_date, data.purchase_order_file, data.completion_file, data.credential_file, data.order_id])
        if(resp) {
            return 'Order edited successfully'
        }
    } catch (error) {
        console.log('Edit order service error:', error);
        return;
    }
}