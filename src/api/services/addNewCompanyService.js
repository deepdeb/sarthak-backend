const writePool = require('../../config/mysql').writePool

exports.addNewCompany = async (data) => {
    try {
        let add_company_sql = "INSERT into sbu (sbu_name, contact_person, contact_number, email, address, city, state_id, pin) VALUES (?,?,?,?,?,?,?,?)"
        const [add_company_resp] = await writePool.query(add_company_sql, [data.sbu_name, data.contact_person, data.contact_number, data.email, data.address, data.city, data.state_id, data.pin]);

        if(add_company_resp) {
            return 'Company added successfully'
        }
    } catch (error) {
        console.log('add new company service error:', error);
        return;
    }
}