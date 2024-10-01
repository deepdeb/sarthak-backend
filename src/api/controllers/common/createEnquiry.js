const Joi = require('joi');
const createEnquiryService = require('../../services/createEnquiryService');
exports.createEnquiryController = async (req, res) => {
    try {
        const createEnquiryData = Joi.object({
            sbu_id: Joi.required(),
            sales_person_id: Joi.required(),
            customer_id: Joi.required(),
            enquiry_date: Joi.required(),
            enquiry_source_id: Joi.required(),
            principal_house: Joi.required(),
            offer_date: Joi.required(),
            basic_value: Joi.required(),
            tentative_finalization_month: Joi.required(),
            tentative_finalization_year: Joi.required(),
            status_initial: Joi.required(),
            remarks_initial: Joi.required(),
            support_initial: Joi.required()
        })
        const { error, value } = createEnquiryData.validate(req.body);
        if(error) {
            console.log(`Invalid create enquiry data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid create enquiry data`);
        const resp = await createEnquiryService.createEnquiry(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Create enquiry controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}

exports.editEnquiryController = async (req, res) => {
    try {
        const editEnquiryData = Joi.object({
            enquiry_id: Joi.required(),
            sbu_id: Joi.required(),
            sales_person_id: Joi.required(),
            customer_id: Joi.required(),
            enquiry_date: Joi.required(),
            enquiry_source_id: Joi.required(),
            principal_house: Joi.required(),
            offer_date: Joi.required(),
            basic_value: Joi.required(),
            tentative_finalization_month: Joi.required(),
            tentative_finalization_year: Joi.required(),
            status_initial: Joi.required(),
            remarks_initial: Joi.required(),
            support_initial: Joi.required()
        })
        const { error, value } = editEnquiryData.validate(req.body);
        if(error) {
            console.log(`Invalid edit enquiry data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid edit enquiry data`);
        const resp = await createEnquiryService.editEnquiry(req.body);
        if(resp) {
            return res.json({ success: true, status: 201, message: resp, response: resp})
        } else {
            return res.json({ success: false, status:500, message: 'Internal server error', response: []})
        }
    } catch (error) {
        console.log('Edit enquiry controller error: ', error)
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}