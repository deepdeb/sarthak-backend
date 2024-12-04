const Joi = require('joi');
const getCompanyDocumentDetailsByIdService = require('../../services/getCompanyDocumentDetailsByIdService')
exports.getCompanyDocumentDetailsByIdController = async (req, res) => {
    try {
        const getCompanyDocumentDetailsByIdData = Joi.object({
            sbu_id: Joi.required()
        })
        const { error, value } = getCompanyDocumentDetailsByIdData.validate(req.body);
        if(error) {
            console.log(`Invalid get company document details by ID data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get company document details by ID data`);
        const resp = await getCompanyDocumentDetailsByIdService.getCompanyDocumentDetailsById(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('get company document details by ID controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}