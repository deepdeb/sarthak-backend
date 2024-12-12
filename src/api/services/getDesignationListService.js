const readPool = require('../../config/mysql').readPool

exports.getDesignationList = async () => {
    try {
        let sql = "SELECT designation_id, designation_name FROM designation WHERE is_deleted = 0 AND is_active = 1 ORDER BY seniority"
        const [resp] = await readPool.query(sql);

        return resp
    } catch (error) {
        console.log('designation list service error: ', error);
        return
    }
}