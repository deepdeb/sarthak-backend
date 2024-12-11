const Joi = require('joi');
const getSegmentsByStateService = require('../../services/getSegmentsByStateService');
exports.getSegmentsByStateController = async (req, res) => {
    try {
        const segmentsByStateData = Joi.object({
            segment_by_state_keyword: Joi.required(),
            sales_person_id: Joi.required(),
            sbu_id: Joi.required()
        })
        const { error, value } = segmentsByStateData.validate(req.body);
        if (error) {
            console.log(`Invalid segments by state data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid segments by state data`);
        const resp = await getSegmentsByStateService.getSegmentsByState(req.body);
        if (resp) {
            return res.json({ success: true, status: 200, message: '', response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('get segments by state controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: [] })
    }
}