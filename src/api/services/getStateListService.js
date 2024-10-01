const readPool = require('../../config/mysql').readPool

exports.getStateList = async () => {
    try {
        let sql = "SELECT state_id, state_name from state"
        const [resp] = await readPool.query(sql);
        return resp;
    } catch (error) {
        console.log('state list service error: ', error)
        return res.json({ success: false, status: 400, message: error.message, response: []})
    }
}