const readPool = require('../../config/mysql').readPool;

exports.getCustomerListForEnquiryOrder = async (data) => {
    try {
        if (data.sbu_id == 0) {
            if(data.report_navigation_type == 'order') {
                let sql = "SELECT c.customer_id, c.customer, o.customer_id FROM customer c INNER JOIN orders o ON o.customer_id = c.customer_id WHERE o.is_deleted = 0 AND o.is_active = 1 AND c.is_deleted = 0 AND c.is_active = 1";
                const [resp] = await readPool.query(sql)

                return resp;
            } else if (data.report_navigation_type == 'enquiry') {
                let sql = "SELECT c.customer_id, c.customer, e.customer_id FROM customer c INNER JOIN enquiry e ON e.customer_id = c.customer_id WHERE e.is_deleted = 0 AND e.is_active = 1 AND e.is_deleted = 0 AND e.is_active = 1";
                const [resp] = await readPool.query(sql)

                return resp;
            }
        } else {
            if(data.report_navigation_type == 'order') {
                let sql = "SELECT c.customer_id, c.customer, o.customer_id FROM customer c INNER JOIN orders o ON o.customer_id = c.customer_id WHERE o.is_deleted = 0 AND o.is_active = 1 AND c.is_deleted = 0 AND c.is_active = 1 AND c.sales_person_id = ?";
                const [resp] = await readPool.query(sql, [data.sales_person_id]);

                return resp;
            } else if (data.report_navigation_type == 'enquiry') {
                let sql = "SELECT c.customer_id, c.customer, e.customer_id FROM customer c INNER JOIN enquiry e ON e.customer_id = c.customer_id WHERE e.is_deleted = 0 AND e.is_active = 1 AND e.is_deleted = 0 AND e.is_active = 1 AND c.sales_person_id = ?";
                const [resp] = await readPool.query(sql, [data.sales_person_id]);

                return resp;
            }
        }
    } catch (error) {
        console.log('Get customer list for enquiry order service error: ', error)
        return;
    }
}