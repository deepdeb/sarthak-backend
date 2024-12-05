const readPool = require('../../config/mysql').readPool;

exports.getCustomerList = async (data) => {
    try {
        let searchCondition = ''
        let searchCondition2 = ''
        if (data.customer_offset) {
            searchCondition2 = "OFFSET " + data.customer_offset + ""
        }
        if (data.search_criteria) {
            if (data.sbu_id == 0) {
                searchCondition = " WHERE sb.sbu_name LIKE '%" + data.search_criteria + "%' OR sp.sales_person_name LIKE '%" + data.search_criteria + "%' OR c.customer LIKE '%" + data.search_criteria + "%' OR c.name LIKE '%" + data.search_criteria + "%' OR c.designation LIKE '%" + data.search_criteria + "%' OR c.department LIKE '%" + data.search_criteria + "%' OR s.segment_name LIKE '%" + data.search_criteria + "%' OR c.mobile LIKE '%" + data.search_criteria + "%' OR c.email LIKE '%" + data.search_criteria + "%' OR c.alt_email LIKE '%" + data.search_criteria + "%' OR st.state_name LIKE '%" + data.search_criteria + "%' OR a.city LIKE '%" + data.search_criteria + "%' OR a.location LIKE '%" + data.search_criteria + "%' OR a.pin LIKE '%" + data.search_criteria + "%'"
            }
            else {
                searchCondition = "AND (sb.sbu_name LIKE '%" + data.search_criteria + "%' OR sp.sales_person_name LIKE '%" + data.search_criteria + "%' OR c.customer LIKE '%" + data.search_criteria + "%' OR c.name LIKE '%" + data.search_criteria + "%' OR c.designation LIKE '%" + data.search_criteria + "%' OR c.department LIKE '%" + data.search_criteria + "%' OR s.segment_name LIKE '%" + data.search_criteria + "%' OR c.mobile LIKE '%" + data.search_criteria + "%' OR c.email LIKE '%" + data.search_criteria + "%' OR c.alt_email LIKE '%" + data.search_criteria + "%' OR st.state_name LIKE '%" + data.search_criteria + "%' OR a.city LIKE '%" + data.search_criteria + "%' OR a.location LIKE '%" + data.search_criteria + "%' OR a.pin LIKE '%" + data.search_criteria + "%')"
            }
        }

        if (data.sbu_id == 0) {
            // let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id " + searchCondition + " ORDER BY c.customer_id"

            let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id " + searchCondition + " ORDER BY c.customer_id DESC LIMIT 10 " + searchCondition2 + ""
            const [resp] = await readPool.query(sql)

            // let total_count = resp.length;
            let total_count_sql = "SELECT count(c.customer_id) as total_count FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id " + searchCondition + ""
            const [total_count_resp] = await readPool.query(total_count_sql);

            return [resp, total_count_resp];
        }
        else {
            // let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id WHERE c.sbu_id =? " + searchCondition + " ORDER BY c.customer_id"

            let sql = "SELECT c.customer_id, c.sbu_id, sb.sbu_name, c.sales_person_id, DATE_FORMAT(c.customer_create_date, '%Y-%m-%d') as customer_create_date, sp.sales_person_name, c.customer, s.segment_name, ss.subsegment_name, c.name, c.designation, c.department, c.mobile, c.alt_mobile, c.email, c.alt_email, c.product_category_id, DATE_FORMAT(c.created_at, '%d-%m-%Y') as date, a.street_no, a.street_name, a.area, a.location, a.district, a.city, st.state_name, a.pin FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id WHERE c.sbu_id =? " + searchCondition + " ORDER BY c.customer_id DESC LIMIT 10 " + searchCondition2 + ""
            const [resp] = await readPool.query(sql, [data.sbu_id, data.sales_person_id]);

            // let total_count = resp.length;
            let total_count_sql = "SELECT count (c.customer_id) FROM customer c JOIN segment s ON s.segment_id = c.segment_id LEFT JOIN subsegment ss ON ss.subsegment_id = c.subsegment_id JOIN sbu sb ON sb.sbu_id = c.sbu_id JOIN address a ON a.customer_id = c.customer_id JOIN state st ON st.state_id = a.state_id JOIN sales_person sp ON sp.sales_person_id = c.sales_person_id WHERE c.sbu_id =? " + searchCondition + ""
            const [total_count_resp] = await readPool.query(total_count_sql);

            return [resp, total_count_resp];
        }
    } catch (error) {
        console.log('Get customer list service error: ', error)
        return;
    }
}