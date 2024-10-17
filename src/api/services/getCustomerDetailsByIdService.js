const { readPool } = require('../../config/mysql');
exports.getCustomerDetailsById = async (data) => {
    try {
        let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, sp.mentor_id, m.mentor_name, c.customer, c.segment_id, s.segment_name, c.subsegment_id, ss.subsegment_name, c.subsubsegment_id, sss.subsubsegment_name, c.subsubsubsegment_id, ssss.subsubsubsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, a.state_id, st.state_name, a.pin, c.product_category_id, pc.product_category_name FROM customer c JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id LEFT JOIN subsubsegment sss ON sss.subsubsegment_id = c.subsubsegment_id LEFT JOIN subsubsubsegment ssss ON ssss.subsubsubsegment_id = c.subsubsubsegment_id JOIN product_category pc ON pc.product_category_id = c.product_category_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id LEFT JOIN mentor m ON m.mentor_id = sp.mentor_id WHERE c.customer_id = ?"

        const [resp] = await readPool.query(sql, [data.customer_id]);

        if(resp) {
            return resp;
        }
    } catch (error) {
        console.log('Get customer details by ID service error: ', error);
        return;
    }
}