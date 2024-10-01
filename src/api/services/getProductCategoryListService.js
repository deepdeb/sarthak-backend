const readPool = require('../../config/mysql').readPool;

exports.getProductCategoryList = async () => {
    try {
        let sql = "SELECT product_category_id, product_category_name FROM product_category WHERE is_deleted = 0 AND is_active = 1"
        const resp = await readPool.query(sql)
        return resp;
    } catch (error) {
        console.log('Product category list service Error: ', error);
        return
    }
}