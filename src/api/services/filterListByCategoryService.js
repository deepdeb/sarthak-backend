const { readPool } = require('../../config/mysql')

exports.filterListByCategory = async (data) => {
    try {
        let select_condition = ''
        let select_condition_2 = ''
        if(data.sbu_id != 0){
            select_condition = "AND sales_person_id = " + data.sales_person_id + ""
            select_condition_2 = "WHERE sales_person_id = " + data.sales_person_id + ""
        }

        if(data.filterby_keyword == 'designation' || data.filterby_keyword == 'department' || data.filterby_keyword == 'customer') {
            let sql = "SELECT distinct " + data.filterby_keyword + " as name FROM customer WHERE is_deleted = 0 AND is_active = 1 "+ select_condition +""
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'salesperson') {
            let sql = "SELECT distinct sales_person_name as name FROM sales_person WHERE is_deleted = 0"
            const [resp] = await readPool.query(sql)

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'segment') {

            let sql1 = "SELECT customer_id FROM customer "+ select_condition_2 +""
            const [resp1] = await readPool.query(sql1)

            const customerIds = resp1.map(customer => customer.customer_id);

            let sql = "SELECT DISTINCT c.segment_id, s.segment_name as name FROM customer c JOIN segment s ON s.segment_id = c.segment_id WHERE c.customer_id IN (?) AND c.is_deleted = 0 AND c.is_active = 1"
            const [resp] = await readPool.query(sql, [customerIds]);

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'location' || data.filterby_keyword == 'city' || data.filterby_keyword == 'pin') {

            let sql1 = "SELECT customer_id FROM customer "+ select_condition_2 +""
            const [resp1] = await readPool.query(sql1)

            const customerIds = resp1.map(customer => customer.customer_id);

            let sql = "SELECT distinct " + data.filterby_keyword + " as name FROM address WHERE customer_id IN (?) AND is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql, [customerIds]);

            const total_count = resp.length

            return [resp, total_count]
        } else if (data.filterby_keyword == 'state') {
            let sql3 = "SELECT customer_id FROM customer " + select_condition_2 + ""
            const [resp3] = await readPool.query(sql3)

            const customerIds = resp3.map(customer => customer.customer_id);

            let sql1 = "SELECT distinct state_id FROM address WHERE customer_id IN (?) AND is_deleted = 0 AND is_active = 1"
            const [resp1] = await readPool.query(sql1, [customerIds]);

            const stateIDs = resp1.map(item => item.state_id);

            let sql2 = "SELECT state_name as name, state_id FROM state WHERE state_id IN (?)"
            const [resp2] = await readPool.query(sql2, [stateIDs])

            const total_count = resp2.length

            return [resp2, total_count]
        }
    } catch (error) {
        console.log('Filter list by category service error: ', error);
        return;
    }
}