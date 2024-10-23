const readPool = require('../../config/mysql').readPool;

exports.getCustomerList = async (data) => {
    try {
        if (data.check_designation_id == 1) {
            let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id ORDER BY c.customer_id DESC"
            const [resp] = await readPool.query(sql)

            let total_count = resp.length;

            return [resp, total_count];
        }
        else {
            let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id WHERE c.sbu_id =? AND c.sales_person_id = ? ORDER BY c.customer_id DESC"
            const [resp] = await readPool.query(sql, [data.sbu_id, data.sales_person_id]);

            let total_count = resp.length;

            return [resp, total_count];
        }
    } catch (error) {
        console.log('Get customer list service error: ', error)
        return;
    }
}