const { readPool } = require('../../config/mysql');
exports.getSalespersonList = async (data) => {
    try {
        let searchCondition = ''
        let searchCondition2 = ''
        if(data.sales_person_offset) {
            searchCondition2 = "OFFSET " + data.sales_person_offset + ""
        }
        if (data.search_criteria) {
            if (data.sbu_id == 0) {
                searchCondition = " WHERE s.sbu_name LIKE '%" + data.search_criteria + "%' OR sp.sales_person_name LIKE '%" + data.search_criteria + "%' OR d.designation_name LIKE '%" + data.search_criteria + "%' OR f.function_name LIKE '%" + data.search_criteria + "%' OR sp.mobile LIKE '%" + data.search_criteria + "%' OR sp.email LIKE '%" + data.search_criteria + "%'"
            }
            else {
                searchCondition = "AND (s.sbu_name LIKE '%" + data.search_criteria + "%' OR sp.sales_person_name LIKE '%" + data.search_criteria + "%' OR d.designation_name LIKE '%" + data.search_criteria + "%' OR f.function_name LIKE '%" + data.search_criteria + "%' OR sp.mobile LIKE '%" + data.search_criteria + "%' OR sp.email LIKE '%" + data.search_criteria + "%')"
            }
        }

        if (data.sbu_id == 0 ) {
            let sql = "SELECT sp.sales_person_id, sp.sbu_id, s.sbu_name, f.function_name, sp.sales_person_name, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id " + searchCondition + " ORDER BY sp.sales_person_id DESC LIMIT 10 " + searchCondition2 + ""
            const [select_resp] = await readPool.query(sql);

            // const total_count = select_resp.length
            let total_count_sql = "SELECT count(sp.sales_person_id) as total_count FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id " + searchCondition + ""
            const [total_count_resp] = await readPool.query(total_count_sql)

            return [select_resp, total_count_resp];
        } else {
            let sql = "SELECT sp.sales_person_id, sp.sbu_id, s.sbu_name, f.function_name, sp.sales_person_name, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id WHERE sp.sbu_id = ? " + searchCondition + " ORDER BY sp.sales_person_id DESC LIMIT 10 " + searchCondition2 + ""
            const [select_resp] = await readPool.query(sql, [data.sbu_id]);

            // const total_count = select_resp.length
            let total_count_sql = "SELECT count(sp.sales_person_id) as total_count FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id WHERE sp.sbu_id = ? " + searchCondition + ""
            const [total_count_resp] = await readPool.query(total_count_sql, [data.sbu_id]);

            return [select_resp, total_count_resp];
        }
    } catch (error) {
        console.log('Get salesperson list service error: ', error);
        return;
    }
}