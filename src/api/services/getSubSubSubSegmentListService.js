const readPool = require('../../config/mysql').readPool

exports.getSubSubSubSegmentList = async (data) => {
    try {
        let resp_to_send = []
        let sql = "SELECT subsubsubsegment_id, subsubsegment_id, subsegment_id, segment_id, subsubsubsegment_name FROM subsubsubsegment WHERE segment_id = ? AND subsegment_id = ? AND subsubsegment_id = ? AND is_deleted = 0 AND is_active = 1"
        const [resp] = await readPool.query(sql, [data.segment_id, data.subsegment_id, data.subsubsegment_id]);

        const total_count = resp.length
        
        resp_to_send.push(resp, total_count);
        return resp_to_send
    } catch (error) {
        console.log('Get sub sub sub segment list service error: ', error)
        return
    }
}