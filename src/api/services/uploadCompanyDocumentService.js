const writePool = require('../../config/mysql').writePool
const readPool = require('../../config/mysql').readPool

exports.uploadCompanyDocument = async (data) => {
    try {
        let sbuIdExistsSql = "SELECT sbu_id FROM sbu WHERE sbu_id = ?"
        const [sbuIdExistsResp] = await readPool.query(sbuIdExistsSql, [data.sbu_id]);

        if(sbuIdExistsResp.length > 0) {
            let uploadCompanyDocumentSql = "UPDATE sbu SET product_file = ?, project_file = ?, incorporation_cert_file = ?, moa_file = ?, aoa_file = ?, trade_license_file = ?, admin_license_file = ?, electrical_contractor_license = ?, bank_details_file = ?, cancelled_cheque_file = ?, balance_sheets_file = ?, pan_card_file = ?, tan_file = ?, gst_cert_file = ?, iso_cert_file = ?, msme_udyam_cert = ?, presentation_file = ?, credential_file = ? WHERE sbu_id = ?"
            const [uploadCompanyDocumentResp] = await writePool.query(uploadCompanyDocumentSql, [data.product_file, data.project_file, data.incorporation_cert_file, data.moa_file, data.aoa_file, data.trade_license_file, data.admin_license_file, data.electrical_contractor_license, data.bank_details_file, data.cancelled_cheque_file, data.balance_sheets_file, data.pan_card_file, data.tan_file, data.gst_cert_file, data.iso_cert_file, data.msme_udyam_cert, data.presentation_file, data.credential_file, data.sbu_id]);
    
    
            if(uploadCompanyDocumentResp) {
                return "Company documents updated successfully";
            }
        } else {
            return "Company doesn't exist";
        }
    } catch (error) {
        console.log('upload company document service error:', error);
        return;
    }
}