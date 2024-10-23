const readPool = require('../../config/mysql').readPool;

exports.getOrderList = async (data) => {
    try {
        if(data.sbu_id == 0) {
            let order_list_sql = "SELECT o.order_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.po_subtype_id, post.po_subtype_name, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN po_subtype post ON post.po_subtype_id = o.po_subtype_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id ORDER BY o.order_id DESC"

            const [resp] = await readPool.query(order_list_sql)
            const total_count = resp.length
            return [resp, total_count]
        }
    } catch (error) {
        console.log('Get order list service error: ', error);
        return;
    }
}