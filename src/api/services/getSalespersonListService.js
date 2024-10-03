const { readPool } = require('../../config/mysql');
exports.getSalespersonList = async (data) => {
    try {
        const resp = []
        if(data.sbu_id == 0) {
            let sql = "SELECT sp.sales_person_id, s.sbu_name, f.function_name, sp.sales_person_name, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id ORDER BY sp.sales_person_id DESC"
            const [select_resp] = await readPool.query(sql);

            let count_sql = "SELECT count(sp.sales_person_id) as total_count FROM sales_person sp"
            const [count_resp] = await readPool.query(count_sql);

            resp.push(select_resp, count_resp[0].total_count);
            return resp;
        }
        else {
            if(data.check_designation_id == 1) {
                let sql = "SELECT sp.sales_person_id, s.sbu_name, f.function_name, sp.sales_person_name, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id WHERE sp.sbu_id = ? ORDER BY sp.sales_person_id DESC"
                const [select_resp] = await readPool.query(sql, [data.sbu_id]);
    
                let count_sql = "SELECT count(sp.sales_person_id) as total_count FROM sales_person sp WHERE sp.sbu_id = ?"
                const [count_resp] = await readPool.query(count_sql, [data.sbu_id]);
                
                resp.push(select_resp, count_resp[0].total_count);
                return resp;
            } else {
                let sql = "SELECT sp.sales_person_id, s.sbu_name, f.function_name, sp.sales_person_name, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id WHERE sp.sbu_id = ? AND sp.sales_person_id = ? ORDER BY sp.sales_person_id DESC"
                const [select_resp] = await readPool.query(sql, [data.sbu_id, data.sales_person_id]);
    
                let count_sql = "SELECT count(sp.sales_person_id) as total_count FROM sales_person sp WHERE sp.sbu_id = ? AND sp.sales_person_id = ?"
                const [count_resp] = await readPool.query(count_sql, [data.sbu_id, data.sales_person_id]);

                resp.push(select_resp, count_resp[0].total_count);
                return resp;
            }
        }
    } catch (error) {
        console.log('Get salesperson list service error: ', error);
        return;
    }
}