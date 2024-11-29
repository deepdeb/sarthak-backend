const readPool = require('../../config/mysql').readPool;

exports.getEnquiryList = async (data) => {
    try {
        let enquiry_list = []
        let total_count = 0

        let searchCondition = ''
        if (data.search_criteria) {
            if (data.sbu_id == 0) {
                searchCondition = " WHERE e.reff_number LIKE '%" + data.search_criteria + "%' OR sp.sales_person_name LIKE '%" + data.search_criteria + "%' OR c.customer LIKE '%" + data.search_criteria + "%' OR e.enquiry_source LIKE '%" + data.search_criteria + "%' OR et.enquiry_type_name LIKE '%" + data.search_criteria + "%' OR est.enquiry_sub_type_name LIKE '%" + data.search_criteria + "%' OR e.principal_house LIKE '%" + data.search_criteria + "%' OR e.basic_value LIKE '%" + data.search_criteria + "%' OR e.tentative_finalization_month LIKE '%" + data.search_criteria + "%' OR e.tentative_finalization_year LIKE '%" + data.search_criteria + "%'"
            }
            else {
                searchCondition = "AND (e.reff_number LIKE '%" + data.search_criteria + "%' OR sp.sales_person_name LIKE '%" + data.search_criteria + "%' OR c.customer LIKE '%" + data.search_criteria + "%' OR e.enquiry_source LIKE '%" + data.search_criteria + "%' OR et.enquiry_type_name LIKE '%" + data.search_criteria + "%' OR est.enquiry_sub_type_name LIKE '%" + data.search_criteria + "%' OR e.principal_house LIKE '%" + data.search_criteria + "%' OR e.basic_value LIKE '%" + data.search_criteria + "%' OR e.tentative_finalization_month LIKE '%" + data.search_criteria + "%' OR e.tentative_finalization_year LIKE '%" + data.search_criteria + "%')"
            }
        }

        // if (data.check_designation_id == 1) {
        if (data.sbu_id == 0) {
            let enquiry_list_sql = "SELECT e.enquiry_id, e.sbu_id, e.sales_person_id, sp.sales_person_name, e.reff_number, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source, et.enquiry_type_name, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%Y-%m-%d') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, e.status_initial, e.remarks_initial, e.support_initial FROM enquiry e JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_type et ON e.enquiry_type_id = et.enquiry_type_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id" + searchCondition + " ORDER BY e.enquiry_id DESC"
            const [enquiry_list_resp] = await readPool.query(enquiry_list_sql);
            enquiry_list = enquiry_list_resp
            total_count = enquiry_list_resp.length
            // } else {
            //     let enquiry_list_sql = "SELECT e.enquiry_id, e.sbu_id, sb.sbu_name, e.sales_person_id, sp.sales_person_name, e.reff_number, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source, et.enquiry_type_name, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%Y-%m-%d') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, e.status_initial, e.remarks_initial, e.support_initial FROM enquiry e JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id JOIN customer c ON c.customer_id = e.customer_id JOIN sbu sb ON e.sbu_id = sb.sbu_id  JOIN enquiry_type et ON e.enquiry_type_id = et.enquiry_type_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id WHERE e.sbu_id = ? ORDER BY e.enquiry_id DESC"
            //     const [enquiry_list_resp] = await readPool.query(enquiry_list_sql, [data.sbu_id]);
            //     enquiry_list = enquiry_list_resp
            //     total_count = enquiry_list_resp.length
            // }
        } else {
            let enquiry_list_sql = "SELECT e.enquiry_id, e.sbu_id, sb.sbu_name, e.sales_person_id, sp.sales_person_name, e.reff_number, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source, et.enquiry_type_name, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%Y-%m-%d') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, e.status_initial, e.remarks_initial, e.support_initial FROM enquiry e JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id JOIN customer c ON c.customer_id = e.customer_id JOIN sbu sb ON e.sbu_id = sb.sbu_id JOIN enquiry_type et ON e.enquiry_type_id = et.enquiry_type_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id WHERE e.sbu_id = ? AND e.sales_person_id = ? "+ searchCondition + " ORDER BY e.enquiry_id DESC"
            const [enquiry_list_resp] = await readPool.query(enquiry_list_sql, [data.sbu_id, data.sales_person_id]);
            enquiry_list = enquiry_list_resp
            total_count = enquiry_list_resp.length
        }

        let last_enquiry_id_sql = "SELECT max(enquiry_id) As last_enquiry_id FROM enquiry"
        const [last_enquiry_id_resp] = await readPool.query(last_enquiry_id_sql);

        return [enquiry_list, total_count, last_enquiry_id_resp]
    } catch (error) {
        console.log('Get enquiry list service error: ', error);
        return;
    }
}