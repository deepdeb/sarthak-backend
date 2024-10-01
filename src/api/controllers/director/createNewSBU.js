const Joi = require('joi');
const createNewSBUService = require('../../services/createNewSBUService')
exports.createNewSBUController = async (req, res) => {
    try {
        const createNewSBUData = Joi.object({
            check_designation_id: Joi.required(),
            sbu_name: Joi.required(),
            product_file: Joi.required(),
            project_file: Joi.required(),
            incorporation_cert_file: Joi.required(),
            moa_file: Joi.required(),
            aoa_file: Joi.required(),
            trade_license_file: Joi.required(),
            admin_license_file: Joi.required(),
            electrical_contractor_license: Joi.required(),
            bank_details_file: Joi.required(),
            cancelled_cheque_file: Joi.required(),
            balance_sheets_file: Joi.required(),
            pan_card_file: Joi.required(),
            tan_file: Joi.required(),
            gst_cert_file: Joi.required(),
            iso_cert_file: Joi.required(),
            msme_udyan_cert: Joi.required(),
            presentation_file: Joi.required(),
            credential_file: Joi.required(),
            contact_person: Joi.required(),
            contact_number: Joi.required(),
            email: Joi.required(),
            address: Joi.required(),
            city: Joi.required(),
            state_id: Joi.required(),
            pin: Joi.required()
        })
        const { error, value } = createNewSBUData.validate(req.body);
        if(error) {
            console.log(`Invalid create new SBU data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid create new SBU data`);
        const resp = await createNewSBUService.createNewSBU(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}