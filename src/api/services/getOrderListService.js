const readPool = require('../../config/mysql').readPool;

exports.getOrderList = async (data) => {
    try {
        let searchCondition = ''
        if (data.search_criteria) {
            if (data.sbu_id == 0) {
                searchCondition = "WHERE o.enquiry_number LIKE '%" + data.search_criteria + "%' OR c.customer LIKE '%" + data.search_criteria + "%' OR o.po_number LIKE '%" + data.search_criteria + "%' OR pot.po_type_name LIKE '%" + data.search_criteria + "%' OR o.basic_po_value LIKE '%" + data.search_criteria + "%' OR o.total_po_value LIKE '%" + data.search_criteria + "%'"
            }
            else {
                searchCondition = "AND (o.enquiry_number LIKE '%" + data.search_criteria + "%' OR c.customer LIKE '%" + data.search_criteria + "%' OR o.po_number LIKE '%" + data.search_criteria + "%' OR c.designation LIKE '%" + data.search_criteria + "%' OR o.basic_po_value LIKE '%" + data.search_criteria + "%' OR o.total_po_value LIKE '%" + data.search_criteria + "%')"
            }
        }

        if (data.sbu_id == 0) {
            let sql = "SELECT o.enquiry_id, o.enquiry_number, o.order_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id " + searchCondition + " ORDER BY o.order_id DESC"

            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        } else {
            let sql = "SELECT o.enquiry_id, o.enquiry_number, o.order_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.sales_person_id = ? " + searchCondition + " ORDER BY o.order_id DESC"

            const [resp] = await readPool.query(sql, [data.sales_person_id]);
            const total_count = resp.length
            return [resp, total_count]
        }
    } catch (error) {
        console.log('Get order list service error: ', error);
        return;
    }
}