const Joi = require('joi');
const getPOTypeListService = require('../../services/getPOTypeListService');
exports.getPOTypeListController = async (req, res) => {
    try {
        const resp = await getPOTypeListService.getPOTypeList();
        if(resp) {
            return res.json({ success: true, status: 200, response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Get PO type list controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}