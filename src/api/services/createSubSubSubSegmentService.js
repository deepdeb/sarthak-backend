const writePool = require('../../config/mysql').writePool
exports.createSubSubSubSegment = async (data) => {
    try {
        let insert_sub_sub_sub_segment_sql = "INSERT INTO subsubsubsegment (subsubsegment_id, subsegment_id, segment_id, subsubsubsegment_name) VALUES (?,?,?,?)"
        const [insert_sub_sub_sub_segment_resp] = await writePool.query(insert_sub_sub_sub_segment_sql, [data.subsubsegment_id, data.subsegment_id, data.segment_id, data.subsubsubsegment_name])

        if(insert_sub_sub_sub_segment_resp) {
            return 'Sub sub sub segment created successfully';
        }
    } catch (error) {
        console.log('create sub sub sub segment service error: ', error)
        return
    }
}