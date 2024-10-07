const readPool = require('../../config/mysql').readPool;

exports.getCustomerListBySalesperson = async (data) => {
    try {
        let customer_list_by_salesperson_sql = "SELECT customer_id, customer FROM customer WHERE sales_person_id = ?"
        const [customer_list_by_salesperson_resp] = await readPool.query(customer_list_by_salesperson_sql, [data.sales_person_id]);
        if (customer_list_by_salesperson_resp) {
            return customer_list_by_salesperson_resp;
        }
    } catch (error) {
        console.log('Get customer list by salesperson error: ', error)
        return
    }
}