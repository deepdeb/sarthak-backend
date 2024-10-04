const Joi = require('joi')
const getMentorListService = require('../../services/getMentorListService');
exports.getMentorListController = async (req, res) => {
    try {
        const getMentorListData = Joi.object({
            sbu_id: Joi.required()
        })
        const {error, value} = getMentorListData.validate(req.body);
        if(error) {
            console.log(`Invalid mentor list data:  ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid mentor list data`);
        const resp = await getMentorListService.getMentorList(req.body);
        if(resp) {
            return res.json({ success: true, status: 200, message: '', response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Get mentor list controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}