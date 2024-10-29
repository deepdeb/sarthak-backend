const { readPool } = require('../../config/mysql')

exports.filterOrderCategory = async (data) => {
    try {
        if(data.filterby_keyword == 'customer') {
            let sql = "SELECT distinct customer as name FROM customer WHERE is_deleted = 0 AND is_active = 1";
            const [resp] = await readPool.query(sql)
            return resp;
        }
        else if (data.filterby_keyword == 'po_type') {
            let sql = "SELECT distinct po_type_name as name FROM po_type WHERE is_deleted = 0 AND is_active = 1";
            const [resp] = await readPool.query(sql)
            return resp;
        }
    } catch (error) {
        console.log('Filter order category service error: ', error);
        return;
    }
}