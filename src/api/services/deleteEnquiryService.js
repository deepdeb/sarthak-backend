const writePool = require('../../config/mysql').writePool

exports.deleteEnquiry = async (data) => {
    try {
        let deleteEnquirySql = "DELETE FROM enquiry WHERE enquiry_id = ?"
        const [deleteEnquiryResp] = await writePool.query(deleteEnquirySql, [data.enquiry_id]);
        if(deleteEnquiryResp) {
            return "Enquiry deleted successfully";
        }
    } catch (error) {
        console.log('delete enquiry service error: ', error);
        return
    }
}