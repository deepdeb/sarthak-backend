const { readPool } = require('../../config/mysql')

exports.filterOrderCategory = async (data) => {
    try {
        let select_condition = ''
        let select_condition_2 = ''
        if(data.sbu_id != 0) {
            select_condition = "AND sales_person_id = " + data.sales_person_id + ""
            select_condition_2 = "WHERE sales_person_id = " + data.sales_person_id + ""
        }
        if(data.filterby_keyword == 'customer') {
            let sql1 = "SELECT DISTINCT customer as name FROM customer WHERE is_deleted = 0 AND is_active = 1 AND customer_id IN (SELECT customer_id FROM orders WHERE is_deleted = 0 AND is_active = 1) "+ select_condition +""
            const [resp1] = await readPool.query(sql1)

            return resp1;
        }
        else if (data.filterby_keyword == 'po_type') {
            let sql = "SELECT distinct po_type_name as name FROM po_type WHERE is_deleted = 0 AND is_active = 1";
            const [resp] = await readPool.query(sql)
            return resp;
        }
        else if (data.filterby_keyword == 'po_number') {
            let sql = "SELECT distinct po_number as name FROM orders WHERE is_deleted = 0 AND is_active = 1 " + select_condition + " ";
            const [resp] = await readPool.query(sql)
            return resp;
        }
        else if (data.filterby_keyword == 'po_date') {
            let sql = "SELECT distinct DATE_FORMAT(po_date, '%Y-%m-%d') as name FROM orders WHERE is_deleted = 0 AND is_active = 1 " + select_condition + " ";
            const [resp] = await readPool.query(sql)
            return resp;
        }
        else if (data.filterby_keyword == 'basic_po_value') {
            let sql = "SELECT distinct basic_po_value as name FROM orders WHERE is_deleted = 0 AND is_active = 1 " + select_condition + "";
            const [resp] = await readPool.query(sql)
            return resp;
        }
        else if (data.filterby_keyword == 'total_po_value') {
            let sql = "SELECT distinct total_po_value as name FROM orders WHERE is_deleted = 0 AND is_active = 1 " + select_condition + "";
            const [resp] = await readPool.query(sql)
            return resp;
        }
        else if (data.filterby_keyword == 'enquiry_id') {
            let sql = "SELECT distinct enquiry_id as name FROM orders WHERE is_deleted = 0 AND is_active = 1 " + select_condition + "";
            const [resp] = await readPool.query(sql)
            return resp; 
        }
        else if (data.filterby_keyword == 'scheduled_completion_date') {
            let sql = "SELECT distinct DATE_FORMAT(scheduled_completion_date, '%Y-%m-%d') as name FROM orders WHERE is_deleted = 0 AND is_active = 1 " + select_condition + "";
            const [resp] = await readPool.query(sql)
            return resp;
        }
    } catch (error) {
        console.log('Filter order category service error: ', error);
        return;
    }
}