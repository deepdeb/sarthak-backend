const { readPool } = require('../../config/mysql')

exports.filterListByCategory = async (data) => {
    try {
        if(data.filterby_keyword == 'designation' || data.filterby_keyword == 'department' || data.filterby_keyword == 'customer') {
            let sql = "SELECT " + data.filterby_keyword + " as name FROM customer WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if(data.filterby_keyword == 'mentor') {
            let sql = "SELECT mentor_name as name FROM mentor WHERE is_active = 1 AND is_deleted = 0"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'salesperson') {
            let sql = "SELECT sales_person_name as name FROM sales_person WHERE is_deleted = 0"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        }
    } catch (error) {
        console.log('Filter list by category service error: ', error);
        return;
    }
}