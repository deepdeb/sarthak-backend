const Joi = require('joi')
const getCompanyByIdService = require('../../services/getCompanyByIdService');
exports.getCompanyByIdController = async (req, res) => {
    try {
        const getCompanyByIdData = Joi.object({
            sbu_id: Joi.required()
        })
        const {error, value} = getCompanyByIdData.validate(req.body);
        if(error) {
            console.log(`Invalid get company by ID data:  ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get company by ID data`);
        const resp = await getCompanyByIdService.getCompanyById(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, message: '', response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Get company by ID controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}