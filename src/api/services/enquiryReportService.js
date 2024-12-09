const readPool = require('../../config/mysql').readPool

exports.getEnquiryReport = async (data) => {
    try {
        let searchCondition = "";
        let searchCondition2 = "";

        if(data.customer_id != 0) {
            searchCondition += " WHERE e.customer_id = " + data.customer_id + ""
        }

        if(data.start_date && data.end_date && data.customer_id == 0) {
            searchCondition2 += " WHERE e.enquiry_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        } else if (data.start_date && data.end_date && data.customer_id != 0) {
            searchCondition2 += " AND e.enquiry_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        }

        let sql = "SELECT e.enquiry_id, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%d-%m-%Y') as enquiry_date, e.enquiry_source, e.enquiry_sub_type_id, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%d-%m-%Y') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, f.follow_up_id, f.status FROM enquiry e JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id LEFT JOIN follow_up f ON f.enquiry_id = e.enquiry_id" + searchCondition + searchCondition2 + ""

        const [resp] = await readPool.query(sql);

        let basic_po_total_sql = "SELECT sum(e.basic_value) as total_basic_po_value FROM enquiry e JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id LEFT JOIN follow_up f ON f.enquiry_id = e.enquiry_id" + searchCondition + searchCondition2 + ""

        const [basic_po_total_resp] = await readPool.query(basic_po_total_sql);

        if(resp && basic_po_total_resp) {
            return [resp, basic_po_total_resp[0].total_basic_po_value];
        }
    } catch (error) {
        console.log("enquiry report error: ", error);
        return false;
    }
}


exports.getEnquiryReportSalesperson = async (data) => {
    try {
        let searchCondition = "";
        let searchCondition2 = "";

        if(data.sales_person_id != 0) {
            searchCondition += " WHERE e.sales_person_id = " + data.sales_person_id + ""
        }

        if(data.start_date && data.end_date && data.sales_person_id == 0) {
            searchCondition2 += " WHERE e.enquiry_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        } else if (data.start_date && data.end_date && data.sales_person_id != 0) {
            searchCondition2 += " AND e.enquiry_date BETWEEN '" + data.start_date + "' AND '" + data.end_date + "'"
        }

        let sql = "SELECT e.enquiry_id, e.sales_person_id, sp.sales_person_name, e.customer_id, c.customer, DATE_FORMAT(e.enquiry_date, '%d-%m-%Y') as enquiry_date, e.enquiry_source, e.enquiry_sub_type_id, est.enquiry_sub_type_name, e.principal_house, DATE_FORMAT(e.offer_date, '%d-%m-%Y') as offer_date, e.basic_value, e.tentative_finalization_month, e.tentative_finalization_year, f.follow_up_id, f.status FROM enquiry e JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id LEFT JOIN follow_up f ON f.enquiry_id = e.enquiry_id" + searchCondition + searchCondition2 + ""

        const [resp] = await readPool.query(sql);

        let basic_po_total_sql = "SELECT sum(e.basic_value) as total_basic_po_value FROM enquiry e JOIN customer c ON c.customer_id = e.customer_id JOIN enquiry_sub_type est ON est.enquiry_sub_type_id = e.enquiry_sub_type_id JOIN sales_person sp ON sp.sales_person_id = e.sales_person_id LEFT JOIN follow_up f ON f.enquiry_id = e.enquiry_id" + searchCondition + searchCondition2 + ""

        const [basic_po_total_resp] = await readPool.query(basic_po_total_sql);

        if(resp && basic_po_total_resp) {
            return [resp, basic_po_total_resp[0].total_basic_po_value];
        }
    } catch (error) {
        console.log("enquiry report salesperson error: ", error);
        return false;
    }
}