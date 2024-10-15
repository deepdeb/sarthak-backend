const readPool = require('../../config/mysql').readPool

exports.getCustomersByFilter = async (data) => {
    try {
        if (data.filter_by == 'mentor') {
            let mentor_sql = "SELECT mentor_id FROM mentor WHERE mentor_name = ? AND is_deleted = 0"
            const [mentor_resp] = await readPool.query(mentor_sql, [data.filter_by_value]);

            let sales_person_sql = "SELECT sales_person_id FROM sales_person WHERE mentor_id = ? AND is_deleted = 0"
            const [sales_person_resp] = await readPool.query(sales_person_sql, [mentor_resp[0].mentor_id]);

            let sql = "SELECT * FROM customer WHERE sales_person_id = ? AND is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql, [sales_person_resp[0].sales_person_id]);

            const total_count = resp.length
            return [resp, total_count];

        } else if (data.filter_by == 'salesperson') {
            let sales_person_sql = "SELECT sales_person_id FROM sales_person WHERE sales_person_name = ? AND is_deleted = 0"
            const [sales_person_resp] = await readPool.query(sales_person_sql, [data.filter_by_value]);

            let sql = "SELECT * FROM customer WHERE sales_person_id = ? AND is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql, [sales_person_resp[0].sales_person_id]);

            const total_count = resp.length
            return [resp, total_count];
        } else {
            let sql = "SELECT * FROM customer WHERE " + data.filter_by + " = ? AND is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql, [data.filter_by_value]);

            const total_count = resp.length
            return [resp, total_count]
        }
    } catch (error) {
        console.log('get customers by filter service error: ', error);
        return
    }
}