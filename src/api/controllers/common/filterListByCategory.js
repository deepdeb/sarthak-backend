const Joi = require('joi');
const filterListByCategoryService = require('../../services/filterListByCategoryService')
exports.filterListByCategoryController = async (req, res) => {
    try {
        const filterListByCategoryData = Joi.object({
        filterby_keyword: Joi.required()
    })
    const { error, value } = filterListByCategoryData.validate(req.body);
    if(error) {
        console.log(`Invalid filter list by category data: ${error.details[0].message}`);
        return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
    }
    console.log(`Valid filter list by category data`);
        const resp = await filterListByCategoryService.filterListByCategory(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, message: '', response: resp[0], total_count: resp[1] })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Filter list by category error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}