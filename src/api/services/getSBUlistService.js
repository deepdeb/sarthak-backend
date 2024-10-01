const readPool = require('../../config/mysql').readPool;

exports.getSBUlist = async () => {
    try {
        let SBU_list_sql = "SELECT sb.sbu_id, sb.sbu_name, sb.contact_person, sb.contact_number, sb.email, sb.address, sb.city, st.state_name, sb.pin FROM sbu sb JOIN state st ON sb.state_id = st.state_id";

        const [resp] = await readPool.query(SBU_list_sql);
    
        return resp;
    } catch (error) {
        console.log('Error: ', error);
        return
    }
}