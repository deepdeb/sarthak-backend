const readPool = require('../../config/mysql').readPool;

exports.getFollowUpById = async (data) => {
    try {
        let follow_up_select_sql = "SELECT follow_up_id, enquiry_id, DATE_FORMAT(status_date, '%Y-%m-%d') as status_date, status, remarks, support FROM follow_up WHERE enquiry_id = ?"
        const [follow_up_select_resp] = await readPool.query(follow_up_select_sql, [data.enquiry_id]);
        if(follow_up_select_resp) {
            return follow_up_select_resp;
        }
    } catch (error) {
        console.log('Follow up by Id service Error: ', error);
        return
    }
}