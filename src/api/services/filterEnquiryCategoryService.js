const { readPool } = require('../../config/mysql')

exports.filterEnquiryCategory = async (data) => {
    try {
        if (data.filterby_keyword == 'enquiry_source' || data.filterby_keyword == 'principalhouse' || data.filterby_keyword == 'basic_value' || data.filterby_keyword == 'tentative_month' || data.filterby_keyword == 'tentative_year') {
            let sql = "SELECT distinct " + data.filterby_keyword + " as name FROM enquiry WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        }
        else if (data.filterby_keyword == 'salesperson') {
            let sql = "SELECT sales_person_name as name FROM sales_person WHERE is_deleted = 0"
            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        }
        else if (data.filterby_keyword == 'customer') {
            let sql = "SELECT customer as name FROM customer WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        }
        else if (data.filterby_keyword == 'enquiry_type') {
            let sql = "SELECT enquiry_type_name as name FROM enquiry_type WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        }
    } catch (error) {
        console.log('Filter enquiry category service error: ', error);
        return;
    }
}