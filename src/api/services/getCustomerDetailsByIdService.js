const { readPool } = require('../../config/mysql');
exports.getCustomerDetailsById = async (data) => {
    try {
        let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, sp.mentor_id, m.mentor_name, c.customer, c.segment_id, s.segment_name, c.subsegment_id, ss.subsegment_name, c.subsubsegment_id, sss.subsubsegment_name, c.subsubsubsegment_id, ssss.subsubsubsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, c.product_category_id, c.other_product_category DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, a.state_id, st.state_name, a.pin FROM customer c JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id LEFT JOIN subsubsegment sss ON sss.subsubsegment_id = c.subsubsegment_id LEFT JOIN subsubsubsegment ssss ON ssss.subsubsubsegment_id = c.subsubsubsegment_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id LEFT JOIN mentor m ON m.mentor_id = sp.mentor_id WHERE c.customer_id = ?"

        let [resp] = await readPool.query(sql, [data.customer_id]);
        if(resp && resp.length > 0) {
                let product_categories = [];
                const product_category_Ids = resp[0].product_category_id.split(',');
                for(let i = 0; i<product_category_Ids.length; i++) {
                    let sql2 = "SELECT product_category_name FROM product_category WHERE product_category_id = " + product_category_Ids[i] + " AND is_deleted = 0 AND is_active = 1"
                    const [resp2] = await readPool.query(sql2);
                    product_categories.push(resp2[0]);
                }
                return [resp, product_categories];
        } else {
            return [];
        }
    } catch (error) {
        console.log('Get customer details by ID service error: ', error);
        return;
    }
}