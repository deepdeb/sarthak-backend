const readPool = require('../../config/mysql').readPool
exports.getDashboardCount = async (data) => {
    try {

        if (data.sbu_id == 0) {
            let customer_count_sql = "SELECT count(customer_id) as total_customers FROM customer"
            const [customer_count_resp] = await readPool.query(customer_count_sql);
            const total_customers = customer_count_resp[0].total_customers;

            let sales_person_count_sql = "SELECT count(sales_person_id) as total_sales_person FROM sales_person WHERE designation_id = 4 OR (sbu_id = 2 AND designation_id = 2) OR (sbu_id = 2 AND designation_id = 3)"
            const [sales_person_count_resp] = await readPool.query(sales_person_count_sql);
            const total_salesperson = sales_person_count_resp[0].total_sales_person

            let segments_count_sql = "SELECT count(segment_id) as total_segments FROM segment"
            const [segments_count_resp] = await readPool.query(segments_count_sql);
            const total_segments = segments_count_resp[0].total_segments

            let enquiries_count_sql = "SELECT count(enquiry_id) as total_enquiries FROM enquiry"
            const [enquiries_count_resp] = await readPool.query(enquiries_count_sql);
            const total_enquiries = enquiries_count_resp[0].total_enquiries

            let orders_count_sql = "SELECT count(order_id) as total_orders FROM orders"
            const [orders_count_resp] = await readPool.query(orders_count_sql);
            const total_orders = orders_count_resp[0].total_orders

            return {
                total_customers,
                total_salesperson,
                total_segments,
                total_enquiries,
                total_orders
            }
        } else if (data.sbu_id == 1) {
            let customer_count_sql = "SELECT count(customer_id) as total_customers FROM customer WHERE sbu_id = ? AND sales_person_id = ?"
            const [customer_count_resp] = await readPool.query(customer_count_sql, [data.sbu_id, data.sales_person_id]);
            const total_customers = customer_count_resp[0].total_customers;

            let sales_person_count_sql = "SELECT count(sales_person_id) as total_sales_person FROM sales_person WHERE sbu_id = ? AND designation_id = 4"
            const [sales_person_count_resp] = await readPool.query(sales_person_count_sql, [data.sbu_id]);
            const total_salesperson = sales_person_count_resp[0].total_sales_person

            let segments_count_sql = "SELECT count(segment_id) as total_segments FROM segment"
            const [segments_count_resp] = await readPool.query(segments_count_sql);
            const total_segments = segments_count_resp[0].total_segments

            let enquiries_count_sql = "SELECT count(enquiry_id) as total_enquiries FROM enquiry WHERE sbu_id = ? AND sales_person_id = ?"
            const [enquiries_count_resp] = await readPool.query(enquiries_count_sql, [data.sbu_id, data.sales_person_id]);
            const total_enquiries = enquiries_count_resp[0].total_enquiries

            let orders_count_sql = "SELECT count(order_id) as total_orders FROM orders WHERE sbu_id = ?"
            const [orders_count_resp] = await readPool.query(orders_count_sql, [data.sbu_id]);
            const total_orders = orders_count_resp[0].total_orders

            return {
                total_customers,
                total_salesperson,
                total_segments,
                total_enquiries,
                total_orders
            }
        } else {
            let customer_count_sql = "SELECT count(customer_id) as total_customers FROM customer WHERE sbu_id = ? AND sales_person_id = ?"
            const [customer_count_resp] = await readPool.query(customer_count_sql, [data.sbu_id, data.sales_person_id]);
            const total_customers = customer_count_resp[0].total_customers;

            let sales_person_count_sql = "SELECT count(sales_person_id) as total_sales_person FROM sales_person WHERE sbu_id = ? AND (designation_id = 2 OR designation_id = 3 OR designation_id = 4)"
            const [sales_person_count_resp] = await readPool.query(sales_person_count_sql, [data.sbu_id]);
            const total_salesperson = sales_person_count_resp[0].total_sales_person

            let segments_count_sql = "SELECT count(segment_id) as total_segments FROM segment"
            const [segments_count_resp] = await readPool.query(segments_count_sql);
            const total_segments = segments_count_resp[0].total_segments

            let enquiries_count_sql = "SELECT count(enquiry_id) as total_enquiries FROM enquiry WHERE sbu_id = ? AND sales_person_id = ?"
            const [enquiries_count_resp] = await readPool.query(enquiries_count_sql, [data.sbu_id, data.sales_person_id]);
            const total_enquiries = enquiries_count_resp[0].total_enquiries

            let orders_count_sql = "SELECT count(order_id) as total_orders FROM orders WHERE sbu_id = ?"
            const [orders_count_resp] = await readPool.query(orders_count_sql, [data.sbu_id]);
            const total_orders = orders_count_resp[0].total_orders

            return {
                total_customers,
                total_salesperson,
                total_segments,
                total_enquiries,
                total_orders
            }
        }
    }

    catch (error) {
        console.log("Error: ", error);
        return;
    }
}