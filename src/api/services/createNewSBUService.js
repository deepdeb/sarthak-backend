const writePool = require('../../config/mysql').writePool
exports.createNewSBU = async(data) => {
    try {
        if(data.check_designation_id == 1) {
            let insert_sql_1 = "INSERT into sbu (sbu_name, product_file, project_file, incorporation_cert_file, moa_file, aoa_file, trade_license_file, admin_license_file, electrical_contractor_license, bank_details_file, cancelled_cheque_file, balance_sheets_file, pan_card_file, tan_file, gst_cert_file, iso_cert_file, msme_udyam_cert, presentation_file, credential_file, contact_person, contact_number, email, address, city, state_id, pin) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const [resp] = await writePool.query(insert_sql_1, [data.sbu_name, data.product_file, data.project_file, data.incorporation_cert_file, data.moa_file, data.aoa_file, data.trade_license_file, data.admin_license_file, data.electrical_contractor_license, data.bank_details_file, data.cancelled_cheque_file, data.balance_sheets_file, data.pan_card_file, data.tan_file, data.gst_cert_file, data.iso_cert_file, data.msme_udyam_cert, data.presentation_file, data.credential_file, data.contact_person, data.contact_number, data.email, data.address, data.city, data.state_id, data.pin]);
    
            if(resp) {
                return 'Company profile created successfully'
            }
        } else {
            return 'You cannot create company'
        }
    } catch (error) {
        console.log('Error:', error);
        return;
    }
}