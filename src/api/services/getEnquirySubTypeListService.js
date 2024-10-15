const readPool = require('../../config/mysql').readPool;

exports.getEnquirySubTypeList = async () => {
    try {
        let sql = "SELECT enquiry_sub_type_id, enquiry_sub_type_name FROM enquiry_sub_type WHERE is_deleted = 0 AND is_active = 1";
        const [resp] = await readPool.query(sql);

        return resp;
    } catch (error) {
        console.log('Enquiry sub type list service Error: ', error);
        return
    }
}