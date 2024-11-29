const readPool = require('../../config/mysql').readPool

exports.getEnquiryById = async (data) => {
    try {
        let enquiry_sql = "SELECT e.enquiry_id, e.enquiry_number, e.sbu_id, sb.sbu_name, e.mentor_id, m.sales_person_name, e.sales_person_id, sp.sales_person_name, e.reff_number, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source, e.enquiry_type_id, et.enquiry_type_name, e.enquiry_sub_type_id, e.product, e.product_description, e.brand, e.sitc_description, e.cable_assembly, e.panel, e.welding_receptable, e.hsa_box, e.others, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%Y-%m-%d') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, e.status_initial, e.remarks_initial, e.support_initial FROM enquiry e JOIN sbu sb ON sb.sbu_id = e.sbu_id JOIN sales_person m ON m.sales_person_id = e.mentor_id JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_type et ON e.enquiry_type_id = et.enquiry_type_id JOIN enquiry_sub_type est ON e.enquiry_sub_type_id = est.enquiry_sub_type_id WHERE e.enquiry_id = ?"
        const [enquiry_resp] = await readPool.query(enquiry_sql, [data.enquiry_id]);

        return enquiry_resp;
    } catch (error) {
        console.log('Get enquiry by ID service error: ', error);
        return;
    }
}