const Joi = require('joi');
const getCustomerListService = require('../../services/getCustomerListService');
exports.getCustomerListController = async (req, res) => {
    try {
        const getCustomerListData = Joi.object({
            sbu_id: Joi.required(),
            sales_person_id: Joi.required(),
            check_designation_id: Joi.required(),
            search_criteria: Joi.optional(),
            offset: Joi.optional()
        })
        const {error, value} = getCustomerListData.validate(req.body);
        if(error) {
            console.log(`Invalid customer list data:  ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid customer list data`);
        const resp = await getCustomerListService.getCustomerList(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp[0], total_count: resp[1][0].total_count})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}