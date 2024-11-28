const Joi = require('joi');
const getSalespersonListService = require('../../services/getSalespersonListService')
exports.getSalespersonListController = async (req, res) => {
    try {
        const getSalespersonListData = Joi.object({
            check_designation_id: Joi.optional(),
            sales_person_id: Joi.optional(),
            sbu_id: Joi.optional(),
            search_criteria: Joi.optional()
        })
        const {error, value} = getSalespersonListData.validate(req.body);
        if(error) {
            console.log(`Invalid sales person list data:  ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid sales person list data`);
        const resp = await getSalespersonListService.getSalespersonList(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, message: '', response: resp[0], total_count: resp[1] })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Get salesperson list controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}