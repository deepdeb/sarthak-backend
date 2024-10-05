const { readPool } = require('../../config/mysql');
exports.getSalespersonById = async (data) => {
    try {
        let sql = "SELECT sp.sales_person_id, sp.mentor_id, sp.sbu_id, s.sbu_name, f.function_id, f.function_name, (SELECT sales_person_name FROM sales_person WHERE sales_person_id = m.mentor_id) as mentor_name, sp.sales_person_name, d.designation_id, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%Y-%m-%d') as dob, sp.password FROM sales_person sp JOIN sbu s ON s.sbu_id = sp.sbu_id JOIN functions f ON f.function_id = sp.function_id JOIN designation d ON sp.designation_id = d.designation_id JOIN mentor m ON m.mentor_id = sp.mentor_id WHERE sp.sales_person_id = ?"

        const [resp] = await readPool.query(sql, [data.sales_person_id]);

        if(resp) {
            return resp;
        }
    } catch (error) {
        console.log('Get salesperson by ID service error: ', error);
        return;
    }
}