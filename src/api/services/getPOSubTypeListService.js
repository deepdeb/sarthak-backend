const readPool = require('../../config/mysql').readPool;
exports.getPOSubTypeList = async (data) => {
    try {
        let sql = "SELECT po_subtype_id, po_type_id, po_subtype_name FROM po_subtype WHERE po_type_id = ? AND is_active = 1 AND is_deleted = 0"
        const [resp] = await readPool.query(sql, [data.po_type_id]);
        if(resp) {
            return resp
        }
    } catch (error) {
        console.log('Get PO sub type list service error:', error);
        return;
    }
}