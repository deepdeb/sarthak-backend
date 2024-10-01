const Joi = require('joi');
const getDashboardCountService = require('../../services/getDashboardCountService');
exports.getDashboardCountController = async (req, res) => {
    try {
        const getDashboardCountData = Joi.object({
            sbu_id: Joi.required(),
            check_designation_id: Joi.required(),
            sales_person_id: Joi.required()
        })
        const { error, value } = getDashboardCountData.validate(req.body);
        if(error) {
            console.log(`Invalid dashboard count data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid dashboard count data`);
        const resp = await getDashboardCountService.getDashboardCount(req.body);
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