const writePool = require('../../config/mysql').writePool
const { readPool } = require('../../config/mysql');

exports.createSubSubSubSegment = async (data) => {
    try {
        let existing_subsubsubsegment_sql = "SELECT subsubsubsegment_id FROM subsubsubsegment WHERE subsubsubsegment_name = ?"
        const [existing_subsubsubsegment_resp] = await readPool.query(existing_subsubsubsegment_sql, data.subsubsubsegment_name);

        if(existing_subsubsubsegment_resp.length > 0) {
            return 'Sub sub sub segment already exists'
        }

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