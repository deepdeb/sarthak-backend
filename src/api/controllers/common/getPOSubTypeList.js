const Joi = require('joi');
const getPOSubTypeListService = require('../../services/getPOSubTypeListService');
exports.getPOSubTypeListController = async (req, res) => {
    try {
        const getPOSubTypeListData = Joi.object({
            po_type_id: Joi.required()
        })
        const {error, value} = getPOSubTypeListData.validate(req.body);
        if(error) {
            console.log(`Invalid get PO sub type list data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid get PO sub type list data`);
        const resp = await getPOSubTypeListService.getPOSubTypeList(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Get PO sub type list controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}