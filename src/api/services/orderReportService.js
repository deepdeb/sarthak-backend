const readPool = require('../../config/mysql').readPool

exports.getOrderReport = async (data) => {
    try {
        let searchCondition = "";
        let searchCondition2 = "";

        if(data.customer_id != 0) {
            searchCondition += " WHERE o.customer_id = " + data.customer_id + ""
        }

        if(data.start_date && data.end_date && data.customer_id == 0) {
            searchCondition2 += " WHERE o.po_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        } else if (data.start_date && data.end_date && data.customer_id != 0) {
            searchCondition2 += " AND o.po_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        }

        let sql = "SELECT o.customer_id, c.customer, DATE_FORMAT(o.po_date, '%d-%m-%Y') as po_date, o.po_number, o.po_type_id, p.po_type_name, o.po_subtype_id, post.po_subtype_name, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%d-%m-%Y') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%d-%m-%Y') as actual_completion_date FROM orders o JOIN customer c ON o.customer_id = c.customer_id JOIN po_type p ON p.po_type_id = o.po_type_id LEFT JOIN po_subtype post ON post.po_subtype_id = o.po_subtype_id" + searchCondition + searchCondition2 + ""
        const [resp] = await readPool.query(sql);

        let basic_po_total_sql = "SELECT sum(o.basic_po_value) as total_basic_po_value FROM orders o JOIN customer c ON o.customer_id = c.customer_id JOIN po_type p ON p.po_type_id = o.po_type_id LEFT JOIN po_subtype post ON post.po_subtype_id = o.po_subtype_id" + searchCondition + searchCondition2 + ""

        const [basic_po_total_resp] = await readPool.query(basic_po_total_sql);

        let total_po_total_sql = "SELECT sum(o.total_po_value) as total_total_po_value FROM orders o JOIN customer c ON o.customer_id = c.customer_id JOIN po_type p ON p.po_type_id = o.po_type_id LEFT JOIN po_subtype post ON post.po_subtype_id = o.po_subtype_id" + searchCondition + searchCondition2 + ""

        const [total_po_total_resp] = await readPool.query(total_po_total_sql);

        if(resp && basic_po_total_resp) {
            return [resp, basic_po_total_resp[0].total_basic_po_value, total_po_total_resp[0].total_total_po_value];
        }
    } catch (error) {
        console.log("order report error: ", error);
        return false;
    }
}


exports.getOrderReportSalesperson = async (data) => {
    try {
        let searchCondition = "";
        let searchCondition2 = "";

        if(data.sales_person_id != 0) {
            searchCondition += " WHERE o.sales_person_id = " + data.sales_person_id + ""
        }

        if(data.start_date && data.end_date && data.sales_person_id == 0) {
            searchCondition2 += " WHERE o.po_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        } else if (data.start_date && data.end_date && data.sales_person_id != 0) {
            searchCondition2 += " AND o.po_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        }

        let sql = "SELECT o.sales_person_id, sp.sales_person_name, o.customer_id, c.customer, DATE_FORMAT(o.po_date, '%d-%m-%Y') as po_date, o.po_number, o.po_type_id, p.po_type_name, o.po_subtype_id, post.po_subtype_name, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%d-%m-%Y') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%d-%m-%Y') as actual_completion_date FROM orders o JOIN customer c ON o.customer_id = c.customer_id JOIN po_type p ON p.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id LEFT JOIN po_subtype post ON post.po_subtype_id = o.po_subtype_id" + searchCondition + searchCondition2 + ""
        const [resp] = await readPool.query(sql);

        let basic_po_total_sql = "SELECT sum(o.basic_po_value) as total_basic_po_value FROM orders o JOIN customer c ON o.customer_id = c.customer_id JOIN po_type p ON p.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id LEFT JOIN po_subtype post ON post.po_subtype_id = o.po_subtype_id" + searchCondition + searchCondition2 + ""

        const [basic_po_total_resp] = await readPool.query(basic_po_total_sql);

        let total_po_total_sql = "SELECT sum(o.total_po_value) as total_total_po_value FROM orders o JOIN customer c ON o.customer_id = c.customer_id JOIN po_type p ON p.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id LEFT JOIN po_subtype post ON post.po_subtype_id = o.po_subtype_id" + searchCondition + searchCondition2 + ""

        const [total_po_total_resp] = await readPool.query(total_po_total_sql);

        if(resp && basic_po_total_resp && total_po_total_resp) {
            return [resp, basic_po_total_resp[0].total_basic_po_value, total_po_total_resp[0].total_total_po_value];
        }
    } catch (error) {
        console.log("order report salesperson error: ", error);
        return false;
    }
}