const readPool = require('../../config/mysql').readPool;

exports.getSBUlist = async (data) => {
    try {
        if(data.sbu_id == 0) {
            let SBU_list_sql = "SELECT sb.sbu_id, sb.sbu_name, sb.contact_person, sb.contact_number, sb.email, sb.address, sb.city, sb.state_id, st.state_name, sb.pin FROM sbu sb JOIN state st ON sb.state_id = st.state_id WHERE is_deleted = 0 AND is_active = 1 ORDER BY sbu_id DESC";

            const [resp] = await readPool.query(SBU_list_sql);
    
            return resp;
        } else {
            let SBU_list_sql = "SELECT sb.sbu_id, sb.sbu_name, sb.contact_person, sb.contact_number, sb.email, sb.address, sb.city, sb.state_id, st.state_name, sb.pin FROM sbu sb JOIN state st ON sb.state_id = st.state_id WHERE sb.sbu_id = ? AND is_deleted = 0 AND is_active = 1 ORDER BY sbu_id DESC";

            const [resp] = await readPool.query(SBU_list_sql, [data.sbu_id]);
    
            return resp;
        }
    } catch (error) {
        console.log('Get SBU list service error: ', error);
        return
    }
}