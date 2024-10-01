const readPool = require('../../config/mysql').readPool;

exports.login = async (data) => {
    try {
        if(data.sbu_id == 0) {
            let login_sql = "SELECT sp.sales_person_id, sp.sbu_id, sp.function_id, sp.sales_person_name, sp.designation_id, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN designation d ON sp.designation_id = d.designation_id WHERE (sp.mobile = ? OR sp.email = ?) AND sp.password = ?"

            const [resp] = await readPool.query(login_sql, [data.username, data.username, data.password]);

            return (resp[0]?.designation_id == 1) ? resp : [];
        } else {
            let login_sql = "SELECT sp.sales_person_id, sp.sbu_id, sp.function_id, sp.sales_person_name, sp.designation_id, d.designation_name, sp.mobile, sp.email, DATE_FORMAT(sp.dob, '%d-%m-%Y') as dob, sp.password FROM sales_person sp JOIN designation d ON sp.designation_id = d.designation_id WHERE (sp.mobile = ? OR sp.email = ?) AND sp.password = ? AND sp.sbu_id = ?"

            const [resp] = await readPool.query(login_sql, [data.username, data.username, data.password, data.sbu_id]);
            
            return resp.length == 0 ? [] : resp[0].designation_id == 1 ? [0] : resp;
        }
    } catch (error) {
        console.log('login service error: ', error);
        return
    }
}