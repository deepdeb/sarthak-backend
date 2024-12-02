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
                await exportToExcel(resp, excelFilePath, value.start_date, value.end_date);
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


exports.enquiryReportSalespersonController = async (req, res) => {
    try {
        const enquiryReportSalespersonData = Joi.object({
            sales_person_id: Joi.optional(),
            start_date: Joi.optional(),
            end_date: Joi.optional(),
            type: Joi.required()
        });
        const { error, value } = enquiryReportSalespersonData.validate(req.body);
        if (error) {
            console.log(`Invalid data for enquiry Report salesperson: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid data for enquiry Report salesperson:`);
        const resp = await enquiryReportService.getEnquiryReportSalesperson(req.body);
        if (resp) {
            if (value.type == 'show') {
                return res.json({ success: true, status: 200, response: resp })
            }
            else if (value.type == 'export') {
                const excelFilePath = 'enquiryreport.xlsx';
                await exportToExcel(resp, excelFilePath, value.start_date, value.end_date);
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
        console.log('enquiry report salesperson controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] });
    } 
}


async function exportToExcel(data, excelFilePath, start_date, end_date) {
    const workbook = xlsx.utils.book_new();
    const today = new Date().toLocaleDateString('en-GB');
    const [startYear, startMonth, startDay] = start_date.split('-');
    const formattedStartDate = `${startDay}/${startMonth}/${startYear}`;

    const [endYear, endMonth, endDay] = end_date.split('-');
    const formattedEndDate = `${endDay}/${endMonth}/${endYear}`;

    const firstHeader = ['Sarthak Components Private Limited'];
    // const firstHeader = [{ v: 'Sarthak Components Private Limited', s: { alignment: { horizontal: 'center', vertical: 'center' }, font: { bold: true } } }];
    const secondHeader = ['List of Enquiries for the period:'];
    const thirdHeader = ['From Date:', formattedStartDate, '', 'To Date:', formattedEndDate, '', 'Run Date:', today];
    const headers = ['SL No.', 'Enquiry Date', 'Source', 'Sub-Type', 'Customer', 'Principal House', 'Offer Date', 'Basic Value', 'Date of Finalization', 'Follow Up Status'];
    const worksheet = [firstHeader, secondHeader, thirdHeader, [], [], headers, ...data.map((row, index) => [
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
