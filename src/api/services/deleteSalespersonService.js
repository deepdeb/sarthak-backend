const writePool = require('../../config/mysql').writePool

exports.deleteSalesperson = async (data) => {
    try {
        let deleteSalespersonSql = "DELETE FROM sales_person WHERE sales_person_id = ?"
        const [deleteSalespersonResp] = await writePool.query(deleteSalespersonSql, [data.sales_person_id]);
        if(deleteSalespersonResp) {
            return "Salesperson deleted successfully";
        }
    } catch (error) {
        console.log('delete salesperson service error: ', error);
        return
    }
}