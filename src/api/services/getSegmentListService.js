const readPool = require('../../config/mysql').readPool

exports.getSegmentList = async (data) => {
    try {
        let resp_to_send = []
        let sql = "SELECT segment_id, segment_name FROM segment WHERE is_deleted = 0 AND is_active = 1"
        const [resp] = await readPool.query(sql);

        const total_count = resp.length

        resp_to_send.push(resp, total_count);
        return resp_to_send
    } catch (error) {
        console.log('segment list service error: ', error);
        return
    }
}