const Joi = require('joi');
const createEnquiryService = require('../../services/createEnquiryService');
exports.createEnquiryController = async (req, res) => {
    try {
        const createEnquiryData = Joi.object({
            sbu_id: Joi.required(),
            mentor_id: Joi.required(),
            sales_person_id: Joi.required(),
            enquiry_number: Joi.required(),
            reff_number: Joi.optional(),
            customer_id: Joi.required(),
            enquiry_date: Joi.required(),
            enquiry_source: Joi.required(),
            enquiry_type_id: Joi.required(),
            enquiry_sub_type_id: Joi.required(),
            product: Joi.optional(),
            product_description: Joi.optional(),
            brand: Joi.optional(),
            sitc_description: Joi.optional(),
            cable_assembly: Joi.optional(),
            panel: Joi.optional(),
            welding_receptable: Joi.optional(),
            hsa_box: Joi.optional(),
            others: Joi.optional(),
            principal_house: Joi.required(),
            offer_date: Joi.optional(),
            basic_value: Joi.optional(),
            tentative_finalization_month: Joi.optional(),
            tentative_finalization_year: Joi.optional(),
            status_initial: Joi.optional(),
            remarks_initial: Joi.optional(),
            support_initial: Joi.optional()
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
            mentor_id: Joi.required(),
            sales_person_id: Joi.required(),
            enquiry_number: Joi.required(),
            reff_number: Joi.optional(),
            customer_id: Joi.required(),
            enquiry_date: Joi.required(),
            enquiry_source: Joi.required(),
            enquiry_type_id: Joi.required(),
            enquiry_sub_type_id: Joi.required(),
            product: Joi.optional(),
            product_description: Joi.optional(),
            brand: Joi.optional(),
            sitc_description: Joi.optional(),
            cable_assembly: Joi.optional(),
            panel: Joi.optional(),
            welding_receptable: Joi.optional(),
            hsa_box: Joi.optional(),
            others: Joi.optional(),
            principal_house: Joi.required(),
            offer_date: Joi.optional(),
            basic_value: Joi.optional(),
            tentative_finalization_month: Joi.optional(),
            tentative_finalization_year: Joi.optional(),
            status_initial: Joi.optional(),
            remarks_initial: Joi.optional(),
            support_initial: Joi.optional()
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