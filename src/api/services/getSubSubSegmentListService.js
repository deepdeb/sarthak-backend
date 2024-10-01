const readPool = require('../../config/mysql').readPool

exports.getSubSubSegmentList = async (data) => {
    try {
        let resp_to_send = []
        let sql = "SELECT subsubsegment_id, subsegment_id, segment_id, subsubsegment_name FROM subsubsegment WHERE segment_id = ? AND subsegment_id = ? AND is_deleted = 0 AND is_active = 1"
        const [resp] = await readPool.query(sql, [data.segment_id, data.subsegment_id]);

        const total_count = resp.length

        resp_to_send.push(resp, total_count);
        return resp_to_send
    } catch (error) {
        console.log('segment list service error: ', error);
        return
    }
}