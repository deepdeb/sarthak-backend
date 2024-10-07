const readPool = require('../../config/mysql').readPool

exports.getEnquiryById = async (data) => {
    try {
        let enquiry_sql = "SELECT e.enquiry_id, e.sbu_id, sb.sbu_name, e.sales_person_id, sp.sales_person_name, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source_id, es.enquiry_source_name, e.principal_house, DATE_FORMAT(e.offer_date, '%Y-%m-%d') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, e.status_initial, e.remarks_initial, e.support_initial FROM enquiry e JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id JOIN customer c ON c.customer_id = e.customer_id JOIN sbu sb ON e.sbu_id = sb.sbu_id JOIN enquiry_source es ON e.enquiry_source_id = es.enquiry_source_id WHERE e.enquiry_id = ?"
        const [enquiry_resp] = await readPool.query(enquiry_sql, [data.enquiry_id]);

        return enquiry_resp;
    } catch (error) {
        console.log('Get enquiry by ID service error: ', error);
        return;
    }
}