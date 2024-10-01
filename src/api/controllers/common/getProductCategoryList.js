const Joi = require('joi');
const getProductCategoryListService = require('../../services/getProductCategoryListService');
exports.getProductCategoryListController = async (req, res) => {
    try {
        const resp = await getProductCategoryListService.getProductCategoryList();
        if(resp) {
            return res.json({ success: true, status: 200, response: resp[0] })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}