const readPool = require('../../config/mysql').readPool

exports.getDesignationById = async (data) => {
    try {
        let get_designation_by_id_sql = "SELECT designation_id, designation_name FROM designation WHERE designation_id = ? AND is_active = 1 AND is_deleted = 0"
        const get_designation_by_id_resp = await readPool.query(get_designation_by_id_sql, [data.designation_id])

        if(get_designation_by_id_resp) {
            return get_designation_by_id_resp
        }
    } catch (error) {
        console.log('get designation by id service error: ', error);
        return
    }
}