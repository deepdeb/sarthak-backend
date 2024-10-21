const writePool = require('../../config/mysql').writePool;
exports.createOrder = async (data) => {
    try {
        let insert_order_sql = "INSERT INTO orders(sbu_id, customer_id, po_number, po_date, po_type_id, po_subtype_id, basic_po_value, total_po_value, scheduled_completion_date, actual_completion_date, purchase_order_file, completion_file, credential_file) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
        const [resp] = await writePool.query(insert_order_sql, [data.sbu_id, data.customer_id, data.po_number, data.po_date, data.po_type_id, data.po_subtype_id, data.basic_po_value, data.total_po_value, data.scheduled_completion_date, data.actual_completion_date, data.purchase_order_file, data.completion_file, data.credential_file]);
        if(resp) {
            return 'Order created successfully'
        }
    } catch (error) {
        console.log('Create order service error:', error);
        return;
    }
}