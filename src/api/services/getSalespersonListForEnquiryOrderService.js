const readPool = require('../../config/mysql').readPool;

exports.getSalespersonListForEnquiryOrder = async (data) => {
    try {
        if (data.sbu_id == 0) {
            if(data.report_navigation_type == 'sales_order') {
                let sql = "SELECT sp.sales_person_id, sp.sales_person_name FROM sales_person sp INNER JOIN orders o ON o.sales_person_id = sp.sales_person_id WHERE o.is_deleted = 0 AND o.is_active = 1 AND sp.is_deleted = 0 GROUP BY sp.sales_person_id";
                const [resp] = await readPool.query(sql)

                return resp;
            } else if (data.report_navigation_type == 'sales_enquiry') {
                let sql = "SELECT sp.sales_person_id, sp.sales_person_name FROM sales_person sp INNER JOIN enquiry e ON e.sales_person_id = sp.sales_person_id WHERE e.is_deleted = 0 AND e.is_active = 1 AND sp.is_deleted = 0 GROUP BY sp.sales_person_id";
                const [resp] = await readPool.query(sql)

                return resp;
            }
        } else {
            if(data.report_navigation_type == 'sales_order') {
                let sql = "SELECT sp.sales_person_id, sp.sales_person_name FROM sales_person sp INNER JOIN orders o ON o.sales_person_id = sp.sales_person_id WHERE o.is_deleted = 0 AND o.is_active = 1 AND sp.is_deleted = 0 AND sp.sales_person_id = ? GROUP BY sp.sales_person_id";
                const [resp] = await readPool.query(sql, [data.sales_person_id]);

                return resp;
            } else if (data.report_navigation_type == 'sales_enquiry') {
                let sql = "SELECT sp.sales_person_id, sp.sales_person_name FROM sales_person sp INNER JOIN enquiry e ON e.sales_person_id = sp.sales_person_id WHERE e.is_deleted = 0 AND e.is_active = 1 AND sp.is_deleted = 0 AND sp.sales_person_id = ? GROUP BY sp.sales_person_id";
                const [resp] = await readPool.query(sql, [data.sales_person_id]);

                return resp;
            }
        }
    } catch (error) {
        console.log('Get sales person list for enquiry order service error: ', error)
        return;
    }
}