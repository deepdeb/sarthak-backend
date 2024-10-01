const writePool = require('../../config/mysql').writePool
exports.createSubSubSegment = async (data) => {
    try {
        let insert_sub_sub_segment_sql = "INSERT INTO subsubsegment (subsegment_id, segment_id, subsubsegment_name) VALUES (?,?,?)"
        const [insert_sub_sub_segment_resp] = await writePool.query(insert_sub_sub_segment_sql, [data.subsegment_id, data.segment_id, data.subsubsegment_name]);

        if(insert_sub_sub_segment_resp) {
            return ('Sub sub segment created successfully');
        }
    } catch (error) {
        console.log('Error: ', error);
        return;
    }
}