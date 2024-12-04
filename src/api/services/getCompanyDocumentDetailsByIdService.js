const readPool = require('../../config/mysql').readPool

exports.getCompanyDocumentDetailsById = async (data) => {
    try {
        let getCompanyDocumentDetailsByIdSql = "SELECT product_file, project_file, incorporation_cert_file, moa_file, aoa_file, trade_license_file, admin_license_file, electrical_contractor_license, bank_details_file, cancelled_cheque_file, balance_sheets_file, pan_card_file, tan_file, gst_cert_file, iso_cert_file, msme_udyam_cert, presentation_file, credential_file WHERE sbu_id = ?"

        const [getCompanyDocumentDetailsByIdResp] = await readPool.query(getCompanyDocumentDetailsByIdSql, [data.sbu_id]);

        if (getCompanyDocumentDetailsByIdResp) {
            return getCompanyDocumentDetailsByIdResp;
        }
    } catch (error) {
        console.log('get company document details by ID service error:', error);
        return;
    }
}