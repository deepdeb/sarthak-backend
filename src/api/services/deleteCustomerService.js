const writePool = require('../../config/mysql').writePool

exports.deleteCustomer = async (data) => {
    try {
        let deleteCustomerSql = "DELETE FROM customer WHERE customer_id = ?"
        const [deleteCustomerResp] = await writePool.query(deleteCustomerSql, [data.customer_id])
        if(deleteCustomerResp) {
            return "Customer deleted successfully";
        }
    } catch (error) {
        console.log('delete customer service error: ', error);
        return
    }
}