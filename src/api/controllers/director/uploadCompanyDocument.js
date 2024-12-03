const Joi = require('joi');
const uploadCompanyDocumentService = require('../../services/uploadCompanyDocumentService');
exports.uploadCompanyDocumentController = async (req, res) => {
    try {
        const uploadCompanyDocumentData = Joi.object({
            sbu_id: Joi.required(),
            product_file: Joi.optional(),
            project_file: Joi.optional(),
            incorporation_cert_file: Joi.optional(),
            moa_file: Joi.optional(),
            aoa_file: Joi.optional(),
            trade_license_file: Joi.optional(),
            admin_license_file: Joi.optional(),
            electrical_contractor_license: Joi.optional(),
            bank_details_file: Joi.optional(),
            cancelled_cheque_file: Joi.optional(),
            balance_sheets_file: Joi.optional(),
            pan_card_file: Joi.optional(),
            tan_file: Joi.optional(),
            gst_cert_file: Joi.optional(),
            iso_cert_file: Joi.optional(),
            msme_udyan_cert: Joi.optional(),
            presentation_file: Joi.optional(),
            credential_file: Joi.optional()
        })
        const { error, value } = uploadCompanyDocumentData.validate(req.body);
        if(error) {
            console.log(`Invalid upload company document data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid upload company document data`);
        const resp = await uploadCompanyDocumentService.uploadCompanyDocument(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('upload company document controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}