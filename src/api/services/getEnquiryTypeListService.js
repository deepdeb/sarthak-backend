const readPool = require('../../config/mysql').readPool;

exports.getEnquiryTypeList = async () => {
    try {
        let sql = "SELECT enquiry_type_id, enquiry_type_name FROM enquiry_type WHERE is_deleted = 0 AND is_active = 1";
        const [resp] = await readPool.query(sql);

        return resp;
    } catch (error) {
        console.log('Enquiry type list service Error: ', error);
        return
    }
}