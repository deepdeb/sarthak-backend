const Joi = require('joi');
const filterEnquiryCategoryService = require('../../services/filterEnquiryCategoryService')
exports.filterEnquiryCategoryController = async (req, res) => {
    try {
        const filterEnquiryCategoryData = Joi.object({
        filterby_keyword: Joi.required()
    })
    const { error, value } = filterEnquiryCategoryData.validate(req.body);
    if(error) {
        console.log(`Invalid filter enquiry category data: ${error.details[0].message}`);
        return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
    }
    console.log(`Valid filter enquiry category data`);
        const resp = await filterEnquiryCategoryService.filterEnquiryCategory(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, message: '', response: resp[0], total_count: resp[1] })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Filter enquiry category error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}