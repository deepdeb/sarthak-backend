const { readPool } = require('../../config/mysql')

exports.filterListByCategory = async (data) => {
    try {
        if(data.filterby_keyword == 'designation' || data.filterby_keyword == 'department' || data.filterby_keyword == 'customer') {
            let sql = "SELECT distinct " + data.filterby_keyword + " as name FROM customer WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'salesperson') {
            let sql = "SELECT distinct sales_person_name as name FROM sales_person WHERE is_deleted = 0"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'segment') {
            let sql = "SELECT segment_name as name FROM segment WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'location' || data.filterby_keyword == 'city' || data.filterby_keyword == 'pin') {
            let sql = "SELECT distinct " + data.filterby_keyword + " as name FROM address WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'state') {
            let sql1 = "SELECT distinct state_id FROM address WHERE is_deleted = 0 AND is_active = 1"
            const [resp1] = await readPool.query(sql1)

            let sql2 = "SELECT state_name as name, state_id FROM state WHERE state_id IN (?)"
            const stateIDs = resp1.map(item => item.state_id);
            const [resp2] = await readPool.query(sql2, [stateIDs])

            const total_count = resp2.length

            return [resp2, total_count]
        }
    } catch (error) {
        console.log('Filter list by category service error: ', error);
        return;
    }
}