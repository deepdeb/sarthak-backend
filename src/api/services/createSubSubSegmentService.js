const writePool = require('../../config/mysql').writePool
const { readPool } = require('../../config/mysql');

exports.createSubSubSegment = async (data) => {
    try {
        let existing_subsubsegment_sql = "SELECT subsubsegment_id FROM subsubsegment WHERE subsubsegment_name = ?"
        const [existing_subsubsegment_resp] = await readPool.query(existing_subsubsegment_sql, data.subsubsegment_name);

        if(existing_subsubsegment_resp.length > 0) {
            return 'Sub sub segment already exists'
        }

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