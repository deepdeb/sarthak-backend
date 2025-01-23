const readPool = require('../../config/mysql').readPool;

exports.getCustomerListBySalesperson = async (data) => {
    try {
        if(data.designation_id == 1) {
            let customer_list_by_salesperson_sql = "SELECT customer_id, customer FROM customer"
            var [customer_list_by_salesperson_resp] = await readPool.query(customer_list_by_salesperson_sql);
        } else {
            let customer_list_by_salesperson_sql = "SELECT customer_id, customer FROM customer WHERE sales_person_id = ?"
            var [customer_list_by_salesperson_resp] = await readPool.query(customer_list_by_salesperson_sql, [data.sales_person_id]);
        }

        if (customer_list_by_salesperson_resp) {
            return customer_list_by_salesperson_resp;
        }
    } catch (error) {
        console.log('Get customer list by salesperson error: ', error)
        return
    }
}