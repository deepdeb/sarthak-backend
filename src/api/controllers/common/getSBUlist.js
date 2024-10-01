const Joi = require('joi');
const getSBUlistService = require('../../services/getSBUlistService');
exports.getSBUlistController = async (req, res) => {
    try {
        const resp = getSBUlistService.getSBUlist(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}