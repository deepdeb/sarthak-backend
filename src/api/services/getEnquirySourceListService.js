const readPool = require('../../config/mysql').readPool;

exports.getEnquirySourceList = async () => {
    try {
        let sql = "SELECT enquiry_source_id, enquiry_source_name FROM enquiry_source WHERE is_deleted = 0 AND is_active = 1";
        const [resp] = await readPool.query(sql);

        return resp;
    } catch (error) {
        console.log('Enquiry source list service Error: ', error);
        return
    }
}