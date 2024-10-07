const readPool = require('../../config/mysql').readPool;

exports.getCustomerList = async (data) => {
    try {
        let resp_to_send = []
        if(data.check_designation_id == 1) {
            if(data.sbu_id == 0) {
                let sql_1 = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, sp.sales_person_name, sp.mentor_id, m.mentor_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id LEFT JOIN mentor m ON m.mentor_id = sp.mentor_id ORDER BY c.customer_id DESC"
                const [resp_1] = await readPool.query(sql_1)

                let total_count = resp_1.length;

                resp_to_send.push(resp_1, total_count);
                return resp_to_send;
            } else {
                let sql_2 = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, c.mentor_id, m.mentor_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id LEFT JOIN mentor m ON m.mentor_id = c.mentor_id WHERE c.sbu_id = ? ORDER BY c.customer_id DESC"
                const [resp_2] = await readPool.query(sql_2, [data.sbu_id]);

                let total_count = resp_2.length;
                
                resp_to_send.push(resp_2, total_count);
                return resp_to_send;
            }
        }
        else {
            let sql_3 = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, c.mentor_id, m.mentor_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id LEFT JOIN mentor m ON m.mentor_id = c.mentor_id WHERE c.sbu_id =? AND c.sales_person_id = ? ORDER BY c.customer_id DESC"
            const [resp_3] = await readPool.query(sql_3, [data.sbu_id, data.sales_person_id]);

            let total_count = resp_3.length;

            resp_to_send.push(resp_3, total_count);
            return resp_to_send;
        }
    } catch (error) {
        console.log('Error: ', error)
        return;
    }
}