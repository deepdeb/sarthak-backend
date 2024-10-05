const writePool = require('../../config/mysql').writePool;
const readPool = require('../../config/mysql').readPool;
exports.createSalesperson = async (data) => {
    try {
        let check_phone_exists_sql = "SELECT sales_person_id FROM sales_person WHERE mobile = ? AND sbu_id = ?"
        const phone_exists_resp = await readPool.query(check_phone_exists_sql, [data.mobile, data.sbu_id]);
        if (phone_exists_resp[0].length > 0) {
            return 'Mobile number exists';
        }

        let check_email_exists_sql = "SELECT sales_person_id FROM sales_person WHERE email = ? AND sbu_id = ?"
        const email_exists_resp = await readPool.query(check_email_exists_sql, [data.email, data.sbu_id]);
        if (email_exists_resp[0].length > 0) {
            return 'Email ID exists';
        }

        if(data.mentor_id) {
            let insert_sql = "INSERT INTO sales_person (mentor_id, sbu_id, function_id, sales_person_name, designation_id, mobile, email, dob, password) VALUES (?,?,?,?,?,?,?,?,?)"
            const resp = await writePool.query(insert_sql, [data.mentor_id, data.sbu_id, data.function_id, data.sales_person_name, data.designation_id, data.mobile, data.email, data.dob, data.password]);
            if (resp) {
                return 'Salesperson created successfully'
            }
        } else {
            let insert_sql = "INSERT INTO sales_person (sbu_id, function_id, sales_person_name, designation_id, mobile, email, dob, password) VALUES (?,?,?,?,?,?,?,?)"
            const resp = await writePool.query(insert_sql, [data.sbu_id, data.function_id, data.sales_person_name, data.designation_id, data.mobile, data.email, data.dob, data.password]);
            if (resp) {
                return 'Salesperson created successfully'
            }
        }
    } catch (error) {
        console.log("Create Salesperson Service Error: ", error);
        return;
    }
}

exports.editSalesperson = async (data) => {
    try {
        let update_sql = "UPDATE sales_person SET mentor_id = ?, sbu_id = ?, function_id = ?, sales_person_name = ?, designation_id = ?, mobile = ?, email = ?, dob = ?, password = ? WHERE sales_person_id = ?"
        const update_resp = await writePool.query(update_sql, [data.mentor_id, data.sbu_id, data.function_id, data.sales_person_name, data.designation_id, data.mobile, data.email, data.dob, data.password, data.sales_person_id]);
        if (update_resp) {
            return 'Profile edited successfully'
        }
    } catch (error) {
        console.log("Edit Salesperson Service Error: ", error);
        return;
    }
}