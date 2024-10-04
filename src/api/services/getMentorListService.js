const readPool = require('../../config/mysql').readPool;

exports.getMentorList = async (data) => {
    try {
        let mentor_list_sql = "SELECT m.mentor_id, m.sales_person_id, sp.sales_person_name as mentor_name, m.sbu_id, sb.sbu_name FROM mentor m JOIN sales_person sp ON sp.sales_person_id = m.sales_person_id JOIN sbu sb ON sb.sbu_id = m.sbu_id WHERE m.sbu_id = ?"
        const [mentor_list_resp] = await readPool.query(mentor_list_sql, [data.sbu_id]);

        if(mentor_list_resp) {
            return mentor_list_resp;
        }
    } catch (error) {
       console.log('Get mentor list service error: ', error);
       return 
    }
}