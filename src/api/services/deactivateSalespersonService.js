const writePool = require('../../config/mysql').writePool

exports.deactivateSalesperson = async (data) => {
    try {
        let deactivateSalespersonSql = "UPDATE sales_person SET is_active = 0 WHERE sales_person_id = ?"
        const [deactivateSalespersonResp] = await writePool.query(deactivateSalespersonSql, [data.sales_person_id]);
        if(deactivateSalespersonResp) {
            return "Salesperson deactivated successfully";
        }
    } catch (error) {
        console.log('deactivate salesperson service error: ', error);
        return
    }
}