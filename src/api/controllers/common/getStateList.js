const Joi = require('joi');
const getStateListService = require('../../services/getStateListService');
exports.getStateListController = async (req, res) => {
    try {
        const resp = await getStateListService.getStateList();
        if(resp) {
            return res.json({ success: true, status: 201, message: '', response: resp})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Error: ', error)
        return res.json({ success: false, status: 400, message: error.message, response: []})
    }
}