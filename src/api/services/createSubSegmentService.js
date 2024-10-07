const writePool = require('../../config/mysql').writePool;
const { readPool } = require('../../config/mysql');
exports.createSubSegment = async (data) => {
    try {
        let existing_subsegment_sql = "SELECT subsegment_id FROM subsegment WHERE subsegment_name = ?"
        const [existing_subsegment_resp] = await readPool.query(existing_subsegment_sql, data.subsegment_name);

        if(existing_subsegment_resp) {
            return 'Sub segment already exists'
        }

        let insert_subsegment_sql = "INSERT INTO subsegment (segment_id, subsegment_name) VALUES (?,?)"
        const [insert_subsegment_resp] = await writePool.query(insert_subsegment_sql, [data.segment_id, data.subsegment_name]);

        if(insert_subsegment_resp) {
        return 'Sub segment created successfully'
        }
    } catch (error) {
        console.log('Create subsegment service error: ', error);
        return;
    }
}

exports.editSubSegment = async (data) => {
    try {
        let update_subsegment_sql = "UPDATE subsegment SET subsegment_name = ? WHERE segment_id = ? AND subsegment_id = ? AND subsegment_name = ?"
        const [update_subsegment_resp] = await writePool.query(update_subsegment_sql, [data.segment_id, data.subsegment_id, data.subsegment_name]);

        if(update_subsegment_resp) {
            return 'Sub segment edited successfully'
        } 
    } catch (error) {
        console.log('Edit subsegment service error: ', error);
        return;
    }
}