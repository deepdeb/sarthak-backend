const readPool = require('../../config/mysql').readPool

exports.getOrdersByFilter = async (data) => {
    try {
        if (data.filter_by == 'customer') {
            let customer_resp_array = []
            let customer_sql = "SELECT customer_id FROM customer WHERE customer = ? AND is_deleted = 0"
            const [customer_resp] = await readPool.query(customer_sql, [data.filter_by_value]);

            for(let i = 0; i<customer_resp.length; i++) {
                let sql = "SELECT o.order_id, o.enquiry_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.customer_id = ? AND o.is_deleted = 0 AND o.is_active = 1"
                const [resp] = await readPool.query(sql, [customer_resp[i].customer_id]);

                if(resp) {
                    customer_resp_array.push(resp);
                }
            }

            const total_count = customer_resp_array.length
            return [customer_resp_array[0], total_count];
        } else if (data.filter_by == 'po_type') {
            let po_type_sql = "SELECT po_type_id FROM po_type WHERE po_type_name = ? AND is_deleted = 0 AND is_active = 1"
            const [po_type_resp] = await readPool.query(po_type_sql, [data.filter_by_value]);

            let sql = "SELECT o.order_id, o.enquiry_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.po_type_id = ? AND o.is_deleted = 0 AND o.is_active = 1"
            const [resp] = await readPool.query(sql, [po_type_resp[0].po_type_id]);

            const total_count = resp.length
            return [resp, total_count];
        } else if (data.filter_by == 'po_number') {
            let sql = "SELECT o.order_id, o.enquiry_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.po_number = ? AND o.is_deleted = 0 AND o.is_active = 1"
            const [resp] = await readPool.query(sql, [data.filter_by_value]);

            const total_count = resp.length
            return [resp, total_count];
        } else if (data.filter_by == 'po_date') {
            let sql = "SELECT o.order_id, o.enquiry_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.po_date = ? AND o.is_deleted = 0 AND o.is_active = 1"
            const [resp] = await readPool.query(sql, [data.filter_by_value]);

            const total_count = resp.length
            return [resp, total_count];
        } else if (data.filter_by == 'basic_po_value') {
            let sql = "SELECT o.order_id, o.enquiry_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.basic_po_value = ? AND o.is_deleted = 0 AND o.is_active = 1"
            const [resp] = await readPool.query(sql, [data.filter_by_value]);

            const total_count = resp.length
            return [resp, total_count];
        } else if (data.filter_by == 'total_po_value') {
            let sql = "SELECT o.order_id, o.enquiry_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.total_po_value = ? AND o.is_deleted = 0 AND o.is_active = 1"
            const [resp] = await readPool.query(sql, [data.filter_by_value]);

            const total_count = resp.length
            return [resp, total_count];
        } else if (data.filter_by == 'scheduled_completion_date') {
            let sql = "SELECT o.order_id, o.enquiry_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.scheduled_completion_date = ? AND o.is_deleted = 0 AND o.is_active = 1"
            const [resp] = await readPool.query(sql, [data.filter_by_value]);

            const total_count = resp.length
            return [resp, total_count];
        } else if (data.filter_by == 'enquiry_id') {
            if(data.filter_by_value == '' || data.filter_by_value == null) {
                let sql = "SELECT o.order_id, o.enquiry_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.enquiry_id IS NULL AND o.is_deleted = 0 AND o.is_active = 1"
                const [resp] = await readPool.query(sql);
    
                const total_count = resp.length
                return [resp, total_count];
            } else {
                let sql = "SELECT o.order_id, o.enquiry_id, o.sales_person_id, sp.sales_person_name, o.sbu_id, sb.sbu_name, o.customer_id, c.customer, o.po_number, DATE_FORMAT(o.po_date, '%Y-%m-%d') as po_date, o.po_type_id, pot.po_type_name, o.product, o.supply_description, o.brand, o.sitc_description, o.cable_assembly, o.panel, o.welding_receptable, o.clamps, o.hsa_box, o.others, o.basic_po_value, o.total_po_value, DATE_FORMAT(o.scheduled_completion_date, '%Y-%m-%d') as scheduled_completion_date, DATE_FORMAT(o.actual_completion_date, '%Y-%m-%d') as actual_completion_date, o.purchase_order_file, o.completion_file, o.credential_file FROM orders o JOIN po_type pot ON pot.po_type_id = o.po_type_id JOIN sales_person sp ON sp.sales_person_id = o.sales_person_id JOIN sbu sb ON o.sbu_id = sb.sbu_id JOIN customer c ON c.customer_id = o.customer_id WHERE o.enquiry_id = ? AND o.is_deleted = 0 AND o.is_active = 1"
                const [resp] = await readPool.query(sql, [data.filter_by_value]);
    
                const total_count = resp.length
                return [resp, total_count];
            }
        }
    }
    catch (error) {
        console.log('get customers by filter service error: ', error);
        return
    }
}