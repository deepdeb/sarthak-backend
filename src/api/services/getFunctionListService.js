const readPool = require('../../config/mysql').readPool;

exports.getFunctionList = async () => {
    try {
        let sql = "SELECT function_id, function_name FROM functions WHERE is_deleted = 0 AND is_active = 1";
        const [resp] = await readPool.query(sql);

        return resp;
    } catch (error) {
        console.log('Function list service Error: ', error);
        return
    }
}