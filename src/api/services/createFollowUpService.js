const writePool = require('../../config/mysql').writePool

exports.createFollowUp = async (data) => {
    try {
        let createFollowupSql = "INSERT INTO follow_up (enquiry_id, status_date, status, remarks, support) VALUES (?,?,?,?,?)"
        const [createFollowupResp] = await writePool.query(createFollowupSql, [data.enquiry_id, data.status_date, data.status, data.remarks, data.support]);

        if(createFollowupResp) {
            return "Follow up created successfully";
        }
    } catch (error) {
        console.log('create follow up service error: ', error);
        return
    }
}