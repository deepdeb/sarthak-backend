const { readPool } = require('../../config/mysql');
exports.getSalespersonList = async (data) => {
    try {
        const resp = []
        if(data.sbu_id == 0) {
            let sql = "SELECT sp.sales_person_id, sp.sbu_id, s.sbu_name, f.function_name, sp.sales_person_name, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id WHERE sp.designation_id = 4 OR sp.designation_id = 3 OR sp.designation_id = 2 ORDER BY sp.sales_person_id DESC"
            const [select_resp] = await readPool.query(sql);

            const total_count = select_resp.length

            resp.push(select_resp, total_count);
            return resp;
        } else if (data.sbu_id == 1) {
            let sql = "SELECT sp.sales_person_id, sp.sbu_id, s.sbu_name, f.function_name, sp.sales_person_name, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id WHERE sp.designation_id = 4 AND sp.sbu_id = ? ORDER BY sp.sales_person_id DESC"
            const [select_resp] = await readPool.query(sql, [data.sbu_id]);

            const total_count = select_resp.length

            resp.push(select_resp, total_count);
            return resp;
        } else {
            let sql = "SELECT sp.sales_person_id, sp.sbu_id, s.sbu_name, f.function_name, sp.sales_person_name, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id WHERE (sp.designation_id = 4 OR sp.designation_id = 3 OR sp.designation_id = 2) AND sp.sbu_id = ? ORDER BY sp.sales_person_id DESC"
            const [select_resp] = await readPool.query(sql, [data.sbu_id]);

            const total_count = select_resp.length

            resp.push(select_resp, total_count);
            return resp;
        }
    } catch (error) {
        console.log('Get salesperson list service error: ', error);
        return;
    }
}