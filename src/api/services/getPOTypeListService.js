const readPool = require('../../config/mysql').readPool;

exports.getPOTypeList = async () => {
    try {
        let sql = "SELECT po_type_id, po_type_name FROM po_type WHERE is_deleted = 0 AND is_active = 1"
        const [resp] = await readPool.query(sql)
        return resp;
    } catch (error) {
        console.log('PO type list service Error: ', error);
        return
    }
}