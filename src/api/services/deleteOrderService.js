const writePool = require('../../config/mysql').writePool

exports.deleteOrder = async (data) => {
    try {
        let deleteOrderSql = "DELETE FROM orders WHERE order_id = ?"
        const [deleteOrderResp] = await writePool.query(deleteOrderSql, [data.order_id]);
        if(deleteOrderResp) {
            return "Order deleted successfully";
        }
    } catch (error) {
        console.log('delete order service error: ', error);
        return
    }
}