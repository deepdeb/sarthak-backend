const { readPool } = require('../../config/mysql');
exports.getCompanyById = async (data) => {
    try {
        let get_company_by_id_sql = "SELECT sb.sbu_name, sb.contact_person, sb.contact_number, sb.email, sb.address, sb.city, st.state_id, sb.pin FROM sbu sb JOIN state st ON st.state_id = sb.state_id WHERE sb.sbu_id = ?"
        const [get_company_by_id_resp] = await readPool.query(get_company_by_id_sql, [data.sbu_id]);

        if(get_company_by_id_resp) {
            return get_company_by_id_resp;
        }
    } catch (error) {
        console.log('Get company by ID service error: ', error);
        return;
    }
}