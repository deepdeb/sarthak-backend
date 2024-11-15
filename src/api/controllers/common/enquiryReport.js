const Joi = require('joi');
const enquiryReportService = require('../../services/enquiryReportService');
const fs = require('fs');
const xlsx = require('xlsx');
exports.enquiryReportController = async (req, res) => {
    try {
        const enquiryReportData = Joi.object({
            customer_id: Joi.optional(),
            start_date: Joi.optional(),
            end_date: Joi.optional(),
            type: Joi.required()
        });
        const { error, value } = enquiryReportData.validate(req.body);
        if (error) {
            console.log(`Invalid data for enquiry Report: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid data for enquiry Report:`);
        const resp = await enquiryReportService.getEnquiryReport(req.body);
        if (resp) {
            if (value.type == 'show') {
                return res.json({ success: true, status: 200, response: resp })
            }
            else if (value.type == 'export') {
                const excelFilePath = 'enquiryreport.xlsx';
                await exportToExcel(resp, excelFilePath);
                return res.download(excelFilePath, (err) => {
                    if (err) {
                        console.error('Error while downloading file:', err);
                        return res.status(500).json({ success: false, status: 500, message: 'Error while downloading file' });
                    }
                    fs.unlinkSync(excelFilePath);
                });
            }
        } else {
            return res.json({ success: false, status: 500, response: [] });
        }
    } catch (error) {
        console.log('enquiry report controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    }
};

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    const headers = ['SL No.', 'Enquiry Date', 'Source', 'Sub-Type', 'Customer', 'Principal House', 'Offer Date', 'Basic Value', 'Date of Finalization', 'Follow Up Status'];
    const worksheet = [headers, ...data.map((row, index) => [
        index + 1,
        row.enquiry_date,
        row.enquiry_source,
        row.enquiry_sub_type_name,
        row.customer,
        row.principal_house,
        row.offer_date,
        row.basic_value ? row.basic_value : '',
        row.tentative_finalization_month && row.tentative_finalization_year ? row.tentative_finalization_month + '/' + row.tentative_finalization_year : '',
        row.status
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}
