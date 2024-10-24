const readPool = require('../../config/mysql').readPool

exports.getCustomersByFilter = async (data) => {
    try {if (data.filter_by == 'salesperson') {
            let sales_person_sql = "SELECT sales_person_id FROM sales_person WHERE sales_person_name = ? AND is_deleted = 0"
            const [sales_person_resp] = await readPool.query(sales_person_sql, [data.filter_by_value]);

            let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id WHERE c.sales_person_id = ? AND c.is_deleted = 0 AND c.is_active = 1"
            const [resp] = await readPool.query(sql, [sales_person_resp[0].sales_person_id]);

            const total_count = resp.length
            return [resp, total_count];
        } else if (data.filter_by == 'customer') {
            let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id WHERE c." + data.filter_by + " = ? AND c.is_deleted = 0 AND c.is_active = 1"
            const [resp] = await readPool.query(sql, [data.filter_by_value]);

            const total_count = resp.length
            return [resp, total_count]
        }
    } catch (error) {
        console.log('get customers by filter service error: ', error);
        return
    }
}