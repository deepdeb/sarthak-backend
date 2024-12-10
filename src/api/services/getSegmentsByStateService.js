const { readPool } = require('../../config/mysql')

exports.getSegmentsByState = async (data) => {
    try {
        let sql1 = "SELECT customer_id FROM address WHERE state_id = ?"
        const [resp1] = await readPool.query(sql1, [data.segment_by_state_keyword]);

        const customerIds = resp1.map(item => item.customer_id);

        let sql2 = "SELECT DISTINCT c.segment_id, s.segment_name as name FROM customer c JOIN segment s ON c.segment_id = s.segment_id WHERE c.customer_id IN (?)"
        const [resp2] = await readPool.query(sql2, [customerIds]);

        if(resp2) {
            return resp2
        }
    } catch (error) {
        console.log('Get segments by state service error: ', error);
        return;
    }
}
