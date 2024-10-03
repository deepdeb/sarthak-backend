const readPool = require('../../config/mysql').readPool

exports.getSubSegmentList = async (data) => {
    try {
        let resp_to_send = []
        let sql = "SELECT subsegment_id, segment_id, subsegment_name FROM subsegment WHERE segment_id = ? AND is_deleted = 0 AND is_active = 1"
        const [resp] = await readPool.query(sql, [data.segment_id]);

        const total_count = resp.length

        resp_to_send.push(resp, total_count);
        return resp_to_send
    } catch (error) {
        console.log('get sub segment list service error: ', error);
        return
    }
}