const { readPool } = require('../../config/mysql')

exports.filterListByCategory = async (data) => {
    try {
        if(data.filterby_keyword == 'designation' || data.filterby_keyword == 'department' || data.filterby_keyword == 'customer') {
            let sql = "SELECT distinct " + data.filterby_keyword + " as name FROM customer WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'salesperson') {
            let sql = "SELECT sales_person_name as name FROM sales_person WHERE is_deleted = 0"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'segment') {
            let sql = "SELECT segment_name as name FROM segment WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        }
    } catch (error) {
        console.log('Filter list by category service error: ', error);
        return;
    }
}