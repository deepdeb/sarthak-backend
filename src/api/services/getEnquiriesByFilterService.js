const readPool = require('../../config/mysql').readPool

exports.getEnquiriesByFilter = async (data) => {
    try {
        if(data.filter_by == 'enquiry_source' || data.filter_by == 'principal_house' || data.filter_by == 'basic_value' || data.filter_by == 'tentative_finalization_month' || data.filter_by == 'tentative_finalization_year' || data.filter_by == 'enquiry_date' || data.filter_by == 'reff_number') {
            if(data.filter_by_value == '' || data.filter_by_value == null || data.filter_by_value == "null") {
                let sql = "SELECT e.enquiry_id, e.sbu_id, e.sales_person_id, sp.sales_person_name, e.reff_number, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source, et.enquiry_type_name, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%Y-%m-%d') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, e.status_initial, e.remarks_initial, e.support_initial FROM enquiry e JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_type et ON e.enquiry_type_id = et.enquiry_type_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id WHERE e." + data.filter_by + " IS NULL ORDER BY e.enquiry_id DESC"
                const [resp] = await readPool.query(sql, [data.filter_by_value])
                const total_count = resp.length
    
                return [resp, total_count];
            } else {
                let sql = "SELECT e.enquiry_id, e.sbu_id, e.sales_person_id, sp.sales_person_name, e.reff_number, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source, et.enquiry_type_name, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%Y-%m-%d') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, e.status_initial, e.remarks_initial, e.support_initial FROM enquiry e JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_type et ON e.enquiry_type_id = et.enquiry_type_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id WHERE e." + data.filter_by + " = ? ORDER BY e.enquiry_id DESC"
                const [resp] = await readPool.query(sql, [data.filter_by_value])
                const total_count = resp.length
    
                return [resp, total_count];
            }
        }
        else if (data.filter_by == 'salesperson') {
            let sales_person_sql = "SELECT sales_person_id FROM sales_person WHERE sales_person_name = ? AND is_deleted = 0"
            const [sales_person_resp] = await readPool.query(sales_person_sql, [data.filter_by_value]);

            const sales_person_ids = sales_person_resp.map(person => person.sales_person_id);

            let sql = "SELECT e.enquiry_id, e.sbu_id, e.sales_person_id, sp.sales_person_name, e.reff_number, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source, et.enquiry_type_name, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%Y-%m-%d') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, e.status_initial, e.remarks_initial, e.support_initial FROM enquiry e JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_type et ON e.enquiry_type_id = et.enquiry_type_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id WHERE e.sales_person_id IN (?) ORDER BY e.enquiry_id DESC"

            const [resp] = await readPool.query(sql, [sales_person_ids])
            const total_count = resp.length

            return [resp, total_count];
        } else if (data.filter_by == 'enquiry_type') {
            let enquiry_type_sql = "SELECT enquiry_type_id FROM enquiry_type WHERE enquiry_type_name = ? AND is_deleted = 0 AND is_active = 1"
            const [enquiry_type_resp] = await readPool.query(enquiry_type_sql, [data.filter_by_value]);

            let sql = "SELECT e.enquiry_id, e.sbu_id, e.sales_person_id, sp.sales_person_name, e.reff_number, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%Y-%m-%d') as enquiry_date, e.enquiry_source, et.enquiry_type_name, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%Y-%m-%d') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, e.status_initial, e.remarks_initial, e.support_initial FROM enquiry e JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_type et ON e.enquiry_type_id = et.enquiry_type_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id WHERE e.enquiry_type_id = ? ORDER BY e.enquiry_id DESC"

            const [resp] = await readPool.query(sql, [enquiry_type_resp[0].enquiry_type_id])
            const total_count = resp.length

            return [resp, total_count];
        }
    } catch (error) {
        console.log('Get enquiries by filter service error: ', error);
        return;
    }
}