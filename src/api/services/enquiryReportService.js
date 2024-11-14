const readPool = require('../../config/mysql').readPool

exports.getEnquiryReport = async (data) => {
    try {
        let searchCondition = "";
        let searchCondition2 = "";

        if(data.customer_id) {
            searchCondition += " WHERE e.customer_id = " + data.customer_id + ""
        }

        if(data.start_date && data.end_date) {
            searchCondition2 += " AND e.enquiry_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        }

        let sql = "SELECT e.enquiry_id, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source, e.enquiry_sub_type_id, est.enquiry_sub_type_name, e.principal_house, e.offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, f.follow_up_id, f.status FROM enquiry e JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id LEFT JOIN follow_up f ON f.enquiry_id = e.enquiry_id" + searchCondition + searchCondition2 + ""

        const [resp] = await readPool.query(sql);

        if(resp) {
            return resp;
        }
    } catch (error) {
        console.log("enquiry report: ", error);
        return false;
    }
}