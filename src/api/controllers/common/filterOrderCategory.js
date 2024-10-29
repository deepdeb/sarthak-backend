const Joi = require('joi');
const filterOrderCategoryService = require('../../services/filterOrderCategoryService');
exports.filterOrderCategoryController = async (req, res) => {
    try {
        const filterOrderCategoryData = Joi.object({
            filterby_keyword: Joi.required()
        })
    const { error, value } = filterOrderCategoryData.validate(req.body);
    if(error) {
        console.log(`Invalid filter order category data: ${error.details[0].message}`);
        return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
    }
    console.log(`Valid filter order category data`);
    const resp = await filterOrderCategoryService.filterOrderCategory(req.body)
    if(resp) {
        return res.json({ success: true, status: 200, message: '', response: resp})
    } else {
        return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
    }
    } catch (error) {
        console.log('Filter order category error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}